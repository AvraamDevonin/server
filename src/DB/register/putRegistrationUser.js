
function putRegistrationUser(connection, user, callback) {

    connection.query(`
        INSERT INTO hype.clientlogin(name, email, password) 
        VALUES("${user.name}", "${user.email}", "${user.password}")`, 
    function (err) {
        if(err) {
            console.log(err);
            callback(false);
        }
        else callback(true);
    });

}

module.exports = putRegistrationUser;