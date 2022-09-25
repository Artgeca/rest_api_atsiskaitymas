const createTypeViewModel = require('./create-type-view-model');

const createTicketPopulatedViewModel = (ticketDoc) => ({
  id: ticketDoc._id,
  type: createTypeViewModel(ticketDoc.typeId),
  price: ticketDoc.price,
  from: ticketDoc.from,
  to: ticketDoc.to,
  createdAt: ticketDoc.createdAt,
  updatedAt: ticketDoc.updatedAt,
});

module.exports = createTicketPopulatedViewModel;
