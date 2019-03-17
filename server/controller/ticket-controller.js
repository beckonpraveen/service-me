
const request = require("request");
const routes = require("express").Router();


let ticketService = require("../service/ticket-service.js");

//take sort, offset, limit as query parameters
routes.get("/list", (req,res) =>{

    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let sortBy = req.query.sortBy;
    let sortOrder = req.query.sortOrder;
    ticketService.getAll(page, limit, sortBy, sortOrder, function(tickets){
        res.status(200);
        res.send({"Status":"Success", "data":tickets});
    })
});

//Autosuggestion for search
routes.post("/search", (req,res) =>{

});

module.exports = routes;
