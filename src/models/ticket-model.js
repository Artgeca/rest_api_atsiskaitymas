const { Schema, model } = require('mongoose');
const yup = require('yup');

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

const ticketValidationSchema = yup.object().shape({
  typeId: yup
    .number().typeError('Ticket.typeId must be a string')
    .required('Ticket.typeId is required'),
  price: yup
    .number().typeError('Ticket.price must be a number')
    .required('Ticket.price is required')
    .positive('Ticket.price must be positive'),
  from: yup
    .string().typeError('Ticket.from must be a string')
    .required('Ticket.from is required'),
  to: yup
    .string().typeError('Ticket.to must be a string')
    .required('Ticket.to is required'),
});

const ticketUpdateValidationSchema = yup.object().shape({
  typeId: yup
    .number().typeError('Ticket.typeId must be a string'),
  price: yup
    .number().typeError('Ticket.price must be a number')
    .positive('Ticket.price must be positive'),
  from: yup
    .string().typeError('Ticket.from must be a string'),
  to: yup
    .string().typeError('Ticket.to must be a string'),
});

ticketSchema.statics.validateTicket = (ticketData) => ticketValidationSchema.validate(ticketData);
ticketSchema.statics.validateTicketUpdate = (ticketData) => ticketUpdateValidationSchema.validate(ticketData);

const TicketModel = model('Ticket', ticketSchema);

module.exports = TicketModel;
