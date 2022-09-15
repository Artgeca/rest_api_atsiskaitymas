const mongoose = require('mongoose');
const { removeEmptyProps } = require('../helpers');
const { sendErrorResponse } = require('../helpers/error');
const TicketModel = require('../models/ticket-model');

const database = {
  tickets: [
    {
      id: 1,
      typeId: 1,
      price: 10.99,
      from: 'Kaunas',
      to: 'Vilnius'
    },
    {
      id: 2,
      typeId: 2,
      price: 13.99,
      from: 'Kaunas',
      to: 'Klaipėda'
    },
    {
      id: 3,
      typeId: 3,
      price: 45,
      from: 'Kaunas',
      to: 'Nida'
    },
    {
      id: 4,
      typeId: 3,
      price: 50.99,
      from: 'Vilnius',
      to: 'Palanga'
    },
    {
      id: 5,
      typeId: 1,
      price: 18.99,
      from: 'Klaipėda',
      to: 'Vilnius'
    }
  ],
  types: [
    {
      id: 1,
      title: 'Bus',
      img: 'https://www.sustainable-bus.com/wp-content/uploads/2019/12/scania-bus4.jpg'
    },
    {
      id: 2,
      title: 'Train',
      img: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Train_Kaunas-Vilna_in_Kaunas_Skoda.jpg'
    },
    {
      id: 3,
      title: 'Plane',
      img: 'https://pbs.twimg.com/media/EECH7MtWsAAnznl.jpg'
    }
  ]
};

const isValidData = ({ typeId, price, from, to }) => (typeId === undefined || typeof typeId !== 'number'
  || price === undefined || typeof price !== 'number' || price < 0
  || from === undefined || typeof from !== 'string'
  || to === undefined || typeof to !== 'string'
);

const createBadTicketDataError = () => ({
  message: 'Ticket data is invalid!',
  status: 400
});

const createTicketNotFoundError = (ticketId) => ({
  message: `Ticket with id: '${ticketId}' not found`,
  status: 404
});

const checkIfValidId = (id) => {
  if (!mongoose.isValidObjectId(id)) throw ({ message: `Id: '${id}' is not valid!`, status: 404 });
};

const checkIfValidData = (ticketData) => {
  if (isValidData(ticketData)) throw createBadTicketDataError(ticketData);
};

const fetchAll = async (req, res) => {
  try {
    const ticketDocuments = await TicketModel.find();
    res.status(200).json(ticketDocuments);
  } catch (err) { sendErrorResponse(err, res); }
};

const fetchById = async (req, res) => {
  const id = req.params.id;

  try {
    checkIfValidId(id);

    const ticket = await TicketModel.findById(id);

    if (ticket === null) throw createTicketNotFoundError(id);

    res.status(200).json(ticket);
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newTicketData = req.body;

  try {
    checkIfValidData(newTicketData);

    const newTicket = await TicketModel.create({ ...newTicketData });

    res.status(201).json(newTicket);
  } catch (err) { sendErrorResponse(err, res); }
};

const replace = async (req, res) => {
  const id = req.params.id;
  const newTicketData = req.body;

  try {
    checkIfValidId(id);

    checkIfValidData(newTicketData);

    const ticket = await TicketModel.findByIdAndUpdate(id, newTicketData, { new: true, runValidators: true });

    if (ticket === null) throw createTicketNotFoundError(id);

    res.status(200).json(ticket);
  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const id = req.params.id;
  const { typeId, price, from, to } = req.body;
  const newTicketData = removeEmptyProps({ typeId, price, from, to });

  try {
    checkIfValidId(id);

    const ticket = await TicketModel.findByIdAndUpdate(id, newTicketData, { new: true });

    if (ticket === null) throw createTicketNotFoundError(id);

    res.status(200).json(ticket);
  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    checkIfValidId(id);

    const ticket = await TicketModel.findByIdAndDelete(id);

    if (ticket === null) throw createTicketNotFoundError(id);

    res.status(200).json(ticket);
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
