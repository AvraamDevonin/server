var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "hype",
  port: 3306
});

function connectDB() {
  connection.connect();

  connection.query("SELECT 1 + 1 AS solution", function (err, rows) {
    if (err) throw err;
    console.log("The solution is: ", rows[0].solution);
  });
}

module.exports = {connectDB, connection};



// connection.end();
