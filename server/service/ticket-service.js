
let ticketRepository = require('../repository/ticket-repository.js');

let ticketService = {

      getAll: function(page, limit, search, sort, callback){

          ticketRepository.findAll(page, limit, search, sort, function(tickets){
            callback(tickets);
          });
      }
}

module.exports = ticketService;
