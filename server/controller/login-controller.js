
const request = require("request");
const routes = require("express").Router();


let loginService = require("../service/login-service.js");

routes.get("/",function(req, res){
    res.send({"status":"Success"});
});

routes.post("/",function(req, res){
    let userId = req.body.userId;
    let password = req.body.password;
    loginService.authenticate(userId, password, function(response){
        if(response.status==="Success"){
          res.status = 200;
        }
        else{
          res.status(401);
        }
        res.send(response);
    });
});

module.exports = routes;
