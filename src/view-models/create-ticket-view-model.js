const createTicketViewModel = (ticketDoc) => ({
  id: ticketDoc._id,
  typeId: ticketDoc.typeId,
  price: ticketDoc.price,
  from: ticketDoc.from,
  to: ticketDoc.to,
  createdAt: ticketDoc.createdAt,
  updatedAt: ticketDoc.updatedAt,
});

module.exports = createTicketViewModel;
