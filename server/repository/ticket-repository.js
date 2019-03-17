const mongoose = require("mongoose");
let ticket = require('../model/ticket.js');

let ticketRepository = {

  findAll: function(page, limit, search, sortData, callback){

      let query = {};
      var options = {};
      options.page = page;
      options.limit = limit;

      if(sortData.sortBy){
          let sort = {};
          let sortOrder = (sortData.sortOrder == "asc"?1:-1);
          sort[sortData.sortBy] = sortOrder;
          options.sort = sort;
      }
      if(search.field){
        query[search.field] = search.value;
      }
      ticket.paginate(query, options)
        .then(response => {
            callback(response)
        })
        .catch(function(err){
          console.log(err);
        });
  }
}
module.exports = ticketRepository;
