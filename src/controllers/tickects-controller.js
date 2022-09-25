const { removeEmptyProps, validMongoObjectId } = require('../helpers');
const { sendErrorResponse, createNotFoundError } = require('../helpers/error');
const TicketModel = require('../models/ticket-model');
const createTicketViewModel = require('../view-models/create-ticket-view-model');

const createTicketNotFoundError = (ticketId) => createNotFoundError(`Ticket with id: '${ticketId}' not found`);

const fetchAll = async (req, res) => {
  const { joinBy } = req.query;

  try {
    const ticketDocuments = joinBy ? await TicketModel.find().populate('typeId') : await TicketModel.find();

    res.status(200).json(ticketDocuments.map(ticket => createTicketViewModel(ticket)));
  } catch (err) { sendErrorResponse(err, res); }
};

const fetchById = async (req, res) => {
  const id = req.params.id;
  const { joinBy } = req.query;

  try {
    if (!validMongoObjectId(id)) throw createTicketNotFoundError(id);

    const ticket = joinBy ? await TicketModel.findById(id).populate('typeId') : await TicketModel.findById(id);

    if (ticket === null) throw createTicketNotFoundError(id);

    res.status(200).json(createTicketViewModel(ticket));
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newTicketData = req.body;

  try {
    await TicketModel.validateTicket(newTicketData);

    const newTicket = await TicketModel.create({ ...newTicketData });

    res.status(201).json(createTicketViewModel(newTicket));
  } catch (err) { sendErrorResponse(err, res); }
};

const replace = async (req, res) => {
  const id = req.params.id;
  const newTicketData = req.body;

  try {
    if (!validMongoObjectId(id)) throw createTicketNotFoundError(id);

    await TicketModel.validateTicket(newTicketData);

    const ticket = await TicketModel.findByIdAndUpdate(id, newTicketData, { new: true, runValidators: true });

    if (ticket === null) throw createTicketNotFoundError(id);

    res.status(200).json(createTicketViewModel(ticket));
  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const id = req.params.id;
  const { typeId, price, from, to } = req.body;
  const newTicketData = removeEmptyProps({ typeId, price, from, to });

  try {
    if (!validMongoObjectId(id)) throw createTicketNotFoundError(id);

    await TicketModel.validateTicketUpdate(newTicketData);

    const ticket = await TicketModel.findByIdAndUpdate(id, newTicketData, { new: true });

    if (ticket === null) throw createTicketNotFoundError(id);

    res.status(200).json(createTicketViewModel(ticket));
  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    if (!validMongoObjectId(id)) throw createTicketNotFoundError(id);

    const ticket = await TicketModel.findByIdAndDelete(id);

    if (ticket === null) throw createTicketNotFoundError(id);

    res.status(200).json(createTicketViewModel(ticket));
  } catch (err) { sendErrorResponse(err, res); }
};

module.exports = {
  fetchAll,
  fetchById,
  create,
  replace,
  update,
  remove
};
