
function putTempCode(connection, user, code, callback) {

    connection.query(`
        INSERT INTO hype.tmpcode(userName, userEmail, code) 
        VALUES("${user.name}", "${user.email}", "${code}")`, 
    function (err) {
        if(err) {
            console.log(err);
            callback(false);
        }
        else callback(true);
    });
}




module.exports = putTempCode;