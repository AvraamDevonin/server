 

function deleteTempCode(connection, user, callback) {
 
    console.log(`
    ********************************
    * ${user.name}
    * ${user.email}
    * ********************************
    `);

  const sql = `
        DELETE FROM hype.tmpcode 
        WHERE userName='${user.name}' and userEmail='${user.email}'`;
  connection.query(sql, function (err) {

    if (err) {
      console.log(err);
      callback(false);
    } else callback(true);
  });

}

module.exports = deleteTempCode;
