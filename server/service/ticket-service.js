
let ticketRepository = require('../repository/ticket-repository.js');

let ticketService = {

      getAll: function(page, limit, sortBy, sortOrder, callback){
          sortOrder = (sortOrder == "asc"?1:-1);
          ticketRepository.findAll(page, limit, sortBy, sortOrder, function(tickets){
            callback(tickets);
          });
      }
}

module.exports = ticketService;
