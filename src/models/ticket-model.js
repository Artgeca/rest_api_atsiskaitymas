const { Schema, model } = require('mongoose');
const yup = require('yup');
const { validMongoObjectId } = require('../helpers');
const TypeModel = require('./type-model');

const ticketSchema = new Schema({
  typeId: {
    type: Schema.Types.ObjectId,
    ref: 'Type',
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
    .string().typeError('Ticket.typeId must be a string')
    .required('Ticket.typeId is required')
    .test('is-valid-id', 'Ticket.typeId id not found', (typeId) => validMongoObjectId(typeId))
    .test('is-type', 'Ticket.typeId id not found', async (typeId) => {
      const type = await TypeModel.findById(typeId);

      return type !== null;
    }),
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
