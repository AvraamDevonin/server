// const fs = require("fs");

// fs.open("./logs.txt", "r", (err, fd) => {
//   console.log("syka");
// });

const fs = require("fs");

function readByName(fileName = "logs.txt") {
 
    fs.readFile(`./logs/${fileName}`, 'utf8' , (err, data) => {
      if (err) {
            console.error(err)
        return
      }
        console.log(data)
    })
}

readByName();
