
//Use System separator
let userRepository = require('../repository/user-repository.js');

let loginService = {

      authenticate: function(userId, password, callback){
            userRepository.findByLoginId(userId, password, function(users){
                  if(users.length > 0){
                    let user = users[0];
                    if(user.password === password){
                      callback({"status":"Success"})
                    }
                    else {
                      callback({"status":"Failure", "message":"Password is incorrect"});
                    }
                  }
                  else{
                    callback({"status":"No such user exists"});
                  }
            });
      }
}

module.exports = loginService;
