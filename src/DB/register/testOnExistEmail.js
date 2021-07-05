function testOnExistEmail(connection, user, callback) {
    connection.query(
      `
        select name from hype.clientlogin 
        where email = "${user.email}"
        `,
      function (err, result) {       
        if (err) callback(false);
        else result.length !== 0 
          ? callback(true) 
          : callback(false);
      }
    );
  }
  
  module.exports = testOnExistEmail;