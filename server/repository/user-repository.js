const mongoose = require("mongoose");

let user = require('../model/user.js');

let userRepository = {

  findByLoginId: function(userId, userPassword, callback){
      let userQuery = user.find().where("id").equals(userId);
      userQuery.exec(function(err, user){
          callback(user);
      });
  }
}
module.exports = userRepository;
