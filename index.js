const express = require("express");
const { nanoid } = require("nanoid");
var multer = require("multer");

var cors = require("cors");

const sendCodeToMail = require("./src/autitifation/mail/sendCodeToMail");

const {
  validationLogin,
  validationEmailPass,
} = require("./src/autitifation/validationLogin");
const writeLog = require("./src/logs/write");

const register = require("./src/autitifation/register");

// db
const { connectDB, connection } = require("./src/DB/connectDB");
const putTempCode = require("./src/DB/register/putTempCode");
const confirmClient = require("./src/DB/register/confirmClient");
const putRegistrationUser = require("./src/DB/register/putRegistrationUser");
const deleteTempCode = require("./src/DB/register/deleteTempCode");
const login = require("./src/DB/login/login");
const testOnExistEmail = require("./src/DB/register/testOnExistEmail");

const app = express();

const stor = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, "./public");
  },
  filename: function (request, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: stor }).single("file");

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type",
    "multipart/form-data"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.post("/register", function (request, response) {
  if (!request.body) return response.sendStatus(400);

  const data = register(request.body);
  const isValidate = validationLogin(data);

  writeLog(
    `
	--- /register
	${data.name} ${data.email} ${data.password} validate=${
      isValidate ? "yes" : "no"
    }`,
    "registration.txt"
  );
  const code = nanoid(6);

  if (isValidate) {
    testOnExistEmail(connection, data, (isExtMail) => {
      if (isExtMail) {
        response.send({ isSend: false, isExtM: true });
      } else {
        putTempCode(connection, data, code, (write) => {
          writeLog(
            `
            tmp code
            ${data.name} ${data.email} ${data.password} write=${
              write ? "yes" : "no"
            }`,
            "registration.txt"
          );
          sendCodeToMail(data.email, data.name, code);
          response.json({ isSend: true, isExtM: false });
        });
      }
    });
  } else {
    response.setHeader("Content-Type", "text/plain");
    response.send({ isSend: false });
  }
});

app.post("/register/delete", (request, response) => {
  if (!request.body) return response.sendStatus(400);

  const data = register(request.body);

  deleteTempCode(connection, data, (isDeleteTmp) => {
    writeLog(
      `
		--- /register/delete
		$delete=${isDeleteTmp} {data.name} ${data.email} ${data.password}`,
      "registration.txt"
    );
    response.json({ isSend: isDeleteTmp });
  });
});

app.post("/register/confirm", function (request, response) {
  if (!request.body) return response.sendStatus(400);

  const data = register(request.body);
  const isValidate = validationLogin(data);

  writeLog(
    `***************************************
    * --- /register/confirm
    * ${data.name} ${data.email} ${data.password} validate=${
      isValidate ? "yes" : "no"
    }
    ****************************************
    `,
    "registration.txt"
  );

  if (isValidate) {
    confirmClient(connection, data, (result) => {
      if (!result) {
        writeLog(
          `***************************************
		   * --- /register/confirm result code
		   * ${data.email} ${data.password} validate=${result ? "yes" : "no"}
		   ***************************************`,
          "registration.txt"
        );
        response.json({ isSend: false });
      } else {
        putRegistrationUser(connection, data, () => {
          response.json({ isSend: true });
        });
      }
    });
  }
});

app.post("/login", function (request, response) {
  if (!request.body) return response.sendStatus(400);

  const data = register(request.body);
  const isValidate = validationEmailPass(data);

  writeLog(
    `
		--- /login
		${data.name} ${data.email} ${data.password} validate=${
      isValidate ? "yes" : "no"
    }`,
    "registration.txt"
  );
  login(connection, data, (userName) => {
    response.json({ name: userName });
  });
});

app.post("/room/settings/avatar",  function (request, response) {
  if (!request.body) return response.sendStatus(400);

  upload(request, response, function (err) {
    if (err instanceof multer.MulterError) {
      // Случилась ошибка Multer при загрузке.
      console.log("Случилась ошибка Multer при загрузке.");
    } else {
      console.log("При загрузке произошла неизвестная ошибка.");
      // При загрузке произошла неизвестная ошибка.
    }
  });
  // console.log("request.file ", request.file, request.body);
  // const data = register(request.body);

  writeLog(
    `
		--- /room/settings/avatar
      save avatar`,
    "registration.txt"
  );

  // console.log( request.file, request.body);
  // response.status(200)

  response.status(200).send("okey");
});

app.get("/room/settings/avatar", (req, res) => {
  res.sendFile(path.join(__dirname, "/room/settings/avatar"));
});

app.get("/", function (request, response) {
  response.send("Главная страница");
  response.end();
});

const port = 3030;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
  connectDB();
});
