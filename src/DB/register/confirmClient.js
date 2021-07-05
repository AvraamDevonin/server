 


function confirmClient(connection, user, callback) {

    connection.query(`
      select code from hype.tmpcode 
      where userName = "${user.name}" and userEmail="${user.email}"
      `, function (err, result) {
        
        if(err) {
            console.log(err);
            callback(false);
        }
        else callback(result);
    });     
}




module.exports = confirmClient;