function login(connection, user, callback) {
  connection.query(
    `
      select name from hype.clientlogin 
      where email = "${user.email}" and password="${user.password}"
      `,
    function (err, result) {       
      if (err) callback(false);
      else result.length !== 0 
        ? callback(JSON.stringify(result[0].name)) 
        : callback(false);
    }
  );
}

module.exports = login;
