const fs = require("fs");
const moment = require('moment');

function writeLog(content = "Some content!", fileName = 'logs.txt') {
  const timeNow = moment().format('MMMM Do YYYY, h:mm:ss a');

  fs.appendFile(__dirname + `/${fileName}`, `\r\n\n ${timeNow} \r\n ${content}`, { flag: "a+" }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('file written successfully');
  });
}

module.exports = writeLog;


 