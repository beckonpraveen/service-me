const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

let ticket = new mongoose.Schema({
      _id:{
        type:String,
        select:false
      },
      ticketId: Number,
      requestor: Number,
      requestorSeniority: String,
      owner: Number,
      category: String,
      type: String,
      severity: String,
      priority: String,
      daysOpen: Number,
      satisfaction: String,
      createdDate: Date
});

ticket.plugin(paginate);
module.exports = mongoose.model('ticket', ticket);
