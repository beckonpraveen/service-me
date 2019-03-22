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
          sort[sortData.sortBy] = sortData.sortOrder;
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
  },
  fetchSummaryData: function(groupBy, callback){

      let aggregateField = "$"+groupBy;
      ticket.aggregate([{"$group":{_id:aggregateField,count:{$sum:1}}}], function(err, summary){
          console.log("Fetched summary is::"+JSON.stringify(summary));
          callback(summary);
      });
  },
  fetchDistinctYears: function(callback){

      ticket.distinct("year", function(err, years){
          console.log("Years data is::"+JSON.stringify(years));
          years.sort(function(a,b){return b-a});
          let top5years = years.slice(0,5);
          callback(top5years);
      });
  }
}
module.exports = ticketRepository;
