const fs = require('fs');
let tickets = JSON.parse(fs.readFileSync('Sample_Data.json', 'utf8'));
let processedTickets = [];
tickets.forEach(function(ticketData){
    var processedTicket = {};
    processedTicket.ticketId = ticketData.ticket;
    processedTicket.requestor = ticketData.Requestor;
    processedTicket.requestorSeniority = getValueString(ticketData.RequestorSeniority);
    processedTicket.owner = ticketData.ITOwner;
    processedTicket.category = ticketData.FiledAgainst;
    processedTicket.type = ticketData.TicketType;
    processedTicket.severity = getValueString(ticketData.Severity);
    processedTicket.priority = getValueString(ticketData.Priority);
    processedTicket.daysOpen = ticketData.daysOpen;
    processedTicket.satisfaction = getValueString(ticketData.Satisfaction);
    if(ticketData["Ticket Creation Date"]!=""){
      var dateObj = new Date(ticketData["Ticket Creation Date"]);
      processedTicket.createdDate = dateObj.toISOString();
      processedTicket.year = dateObj.getFullYear();
    }
    processedTickets.push(processedTicket);
});

fs.writeFile("processed_sample_data.json",JSON.stringify(processedTickets), function(err){
    console.log("Preprocessing done");
});

/*
Remove - and return just the text value
*/
function getValueString(valueWithHypen){

    let splits = valueWithHypen.split("-");
    return splits[1].trim();
}
