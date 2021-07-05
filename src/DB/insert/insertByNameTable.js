var mysql = require('mysql');


// todo нужны выбрать таблицу по имени и вставить данные
// function insertByNameTable(tableName, user) {
//   var connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root"
//   });
  
//   connection.connect(function(err) {
//     if (err) throw err;
    
//     console.log("Connected!");
//     connection.query(`CREATE DATABASE ${tableName}`, function (err, result) {
//       if (err) throw err;
//       console.log("Database created");
//     });
//   });
// }

// insertByNameTable();
