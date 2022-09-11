const { Schema, model } = require('mongoose');

const ticketSchema = new Schema({
  typeId: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

const TicketModel = model('Ticket', ticketSchema);

module.exports = TicketModel;
