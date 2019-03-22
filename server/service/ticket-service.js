
let ticketRepository = require('../repository/ticket-repository.js');

let ticketService = {
      chartsList:['totalByType', 'totalByPriority'],
      chartsConfig: {
        totalByType:{
              title:'Total Tickets By Type',
              type:'pie',
              groupBy:'type'
        },
        totalByPriority:{
              title:'Total Tickets By Priority',
              type:'bar',
              groupBy:'priority'
        }
      },
      getAll: function(page, limit, search, sort, callback){

          ticketRepository.findAll(page, limit, search, sort, function(tickets){
            callback(tickets);
          });
      },
      getAllCharts: function(callback){

            callback(this.chartsList);
      },
      getChartByName: function(chartName, callback){
            console.log("Get chart by name called for chart::"+chartName);
            let chartConfig = this.chartsConfig[chartName];
            ticketRepository.fetchSummaryData(chartConfig.groupBy, function(chartData){
              callback(chartData);
            });
      },
      getDistinctTicketYears: function(callback){
          ticketRepository.fetchDistinctYears(function(years){
            callback(years);
          });
      }

}

module.exports = ticketService;
