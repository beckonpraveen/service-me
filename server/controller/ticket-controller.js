
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
        console.log(JSON.stringify(req.query.sort));
        let sortData = req.query.sort.split(":");
        sort.sortBy = sortData[0];
        sort.sortOrder = sortData[1];
    }
    ticketService.getAll(page, limit, search, sort, function(response){

        let processedTickets = [];
        response.docs.forEach(function(ticket){
          var processedTicket = JSON.parse(JSON.stringify(ticket));
          if(processedTicket.createdDate){
            var dateString = new Date(processedTicket.createdDate).toString();
            var tokens = dateString.split(" ");
            dateString = tokens[1] + " "+ tokens[2] + " "+ tokens[3];
            processedTicket["createdDate"] = dateString;
            processedTickets.push(processedTicket);
          }
        });
        response.docs = processedTickets;
        res.status(200);
        res.send({"Status":"Success", "data":response});
    })
});

/*
Ideally should fetch chart by id, using name for simpplicity as the chart list is not coming
from the database
*/
routes.get("/charts",(req,res) =>{
    let chartName = req.query.name;
    ticketService.getChartByName(chartName, function(chartData){
        res.set(200);
        res.send({"status":"Success", "data":chartData});
    });
});

routes.get("/years",(req,res) => {
    ticketService.getDistinctTicketYears(function(years){
        res.set(200);
        res.send({"status":"Success", "data":years});
    })
});

//Autosuggestion for search
routes.post("/search", (req,res) =>{

});

module.exports = routes;
