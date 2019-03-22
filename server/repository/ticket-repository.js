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
  fetchSummaryData: function(groupBy, yearValue, callback){

      let aggregateField = "$"+groupBy;
      let groupConfig = {"$group":{_id:aggregateField,count:{$sum:1}}};
      let aggregate = [];
      if(yearValue){
        aggregate.push({$match :{year:parseInt(yearValue)}});
      }
      aggregate.push(groupConfig);
      ticket.aggregate(aggregate, function(err, summary){
          callback(summary);
      });
  },
  fetchCountData: function(fieldName, fieldValue, yearValue, callback){

      var query = {};
      query[fieldName] = fieldValue;
      if(yearValue){
        query['year'] = parseInt(yearValue);
      }
      ticket.countDocuments(query, function(err, countResult){
          callback(countResult);
      });
  },
  fetchDistinctYears: function(callback){

      ticket.distinct("year", function(err, years){
          years.sort(function(a,b){return b-a});
          let top5years = years.slice(0,5);
          callback(top5years);
      });
  }
}
module.exports = ticketRepository;
