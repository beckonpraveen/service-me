const mongoose = require("mongoose");
let ticket = require('../model/ticket.js');

let ticketRepository = {

  findAll: function(page, limit, sortBy, sortOrder, callback){

      var options = {};
      options.page = page;
      options.limit = limit;
      if(sortBy){
          let sort = {};
          sort[sortBy] = sortOrder;
          options.sort = sort;
      }
      ticket.paginate({}, options)
        .then(response => {
            callback(response)
        })
        .catch(function(err){
          console.log("Error occured");
          console.log(err);
        });
  }
}
module.exports = ticketRepository;
