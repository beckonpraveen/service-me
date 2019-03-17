const mongoose = require("mongoose");

let user = new mongoose.Schema({
    id:String,
    password:String
});

module.exports = mongoose.model('user', user);
