

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
                      callback({"status":"Failure", "data":"Password is incorrect"});
                    }
                  }
                  else{
                    callback({"data":"No such user exists"});
                  }
            });
      }
}

module.exports = loginService;
