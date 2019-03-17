
const request = require("request");
const routes = require("express").Router();


let ticketService = require("../service/ticket-service.js");

//take sort, offset, limit as query parameters
routes.get("/list", (req,res) =>{

    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let sortBy = req.query.sortBy;
    let sortOrder = req.query.sortOrder;
    let search = {};
    let sort = {};
    if(req.query.search){
        let searchData = req.query.search.split(":");
        search.field = searchData[0];
        search.value = searchData[1];
    }
    if(req.query.sort){
        let sortData = req.query.sort.split(":");
        sort.sortBy = sortData[0];
        sort.sortOrder = sortData[1];
    }
    ticketService.getAll(page, limit, search, sort, function(tickets){
        res.status(200);
        res.send({"Status":"Success", "data":tickets});
    })
});

//Autosuggestion for search
routes.post("/search", (req,res) =>{

});

module.exports = routes;
