
let ticketRepository = require('../repository/ticket-repository.js');

let ticketService = {
      chartsList:['totalByType', 'totalByPriority','totalByCategory','totalBySatisfaction','totalByYear','totalOpen'],
      chartsConfig: {
        totalByType:{
              type:'pie',
              groupBy:'type'
        },
        totalByPriority:{
              type:'bar',
              groupBy:'priority'
        },
        totalByCategory:{
              type:'bar',
              groupBy:'category'
        },
        totalBySatisfaction:{
              type:'pie',
              groupBy:'satisfaction'
        },
        totalByYear:{
              type:'line',
              groupBy:'year'
        },
        totalOpen:{
              type:'text',
              count:{
                  "fieldName":"satisfaction",
                  "fieldValue":"Unknown"
              }
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
      getChartByName: function(chartName, year, callback){

            let chartConfig = this.chartsConfig[chartName];
            console.log("Chart config is::"+JSON.stringify(chartConfig));
            if(chartConfig.groupBy){
              ticketRepository.fetchSummaryData(chartConfig.groupBy, year, function(chartData){
                callback(chartData);
              });
            }
            else if(chartConfig.count){
              ticketRepository.fetchCountData(chartConfig.count.fieldName,chartConfig.count.fieldValue, year, function(chartData){
                callback(chartData);
              });
            }
      },
      getDistinctTicketYears: function(callback){

          ticketRepository.fetchDistinctYears(function(years){
            callback(years);
          });
      }

}

module.exports = ticketService;
