const TicketModel = require("../models/ticket-model");

const database = {
  tickets: [
    {
      id: 1,
      typeId: 1,
      price: 10.99,
      from: "Kaunas",
      to: "Vilnius"
    },
    {
      id: 2,
      typeId: 2,
      price: 13.99,
      from: "Kaunas",
      to: "Klaipėda"
    },
    {
      id: 3,
      typeId: 3,
      price: 45,
      from: "Kaunas",
      to: "Nida"
    },
    {
      id: 4,
      typeId: 3,
      price: 50.99,
      from: "Vilnius",
      to: "Palanga"
    },
    {
      id: 5,
      typeId: 1,
      price: 18.99,
      from: "Klaipėda",
      to: "Vilnius"
    }
  ],
  types: [
    {
      id: 1,
      title: "Bus",
      img: "https://www.sustainable-bus.com/wp-content/uploads/2019/12/scania-bus4.jpg"
    },
    {
      id: 2,
      title: "Train",
      img: "https://upload.wikimedia.org/wikipedia/commons/4/44/Train_Kaunas-Vilna_in_Kaunas_Skoda.jpg"
    },
    {
      id: 3,
      title: "Plane",
      img: "https://pbs.twimg.com/media/EECH7MtWsAAnznl.jpg"
    }
  ]
};

const fetchAll = async (req, res) => {
  const ticketDocuments = await TicketModel.find();
  res.status(200).json(ticketDocuments);
};

const fetchById = async (req, res) => {
  const id = req.params.id;

  try {
    const ticket = await TicketModel.findById(id);

    if (ticket === null) throw ({
      message: `Ticket with id: '${id}' was not found`,
      status: 404
    });

    res.status(200).json(ticket);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

const create = async (req, res) => {
  const newTicketData = req.body;

  try {
    const { typeId, price, from, to } = newTicketData;

    if (typeId === undefined || typeof typeId !== 'number'
      || price === undefined || typeof price !== 'number'
      || from === undefined || typeof from !== 'string'
      || to === undefined || typeof to !== 'string'
    ) throw ({
      message: `Ticket data is invalid:\n${JSON.stringify(newTicketData)}`,
      status: 400
    });

    const newTicket = await TicketModel.create({ ...newTicketData });

    res.status(201).json(newTicket);
  } catch ({ status, message }) {
    res.status(status).json({ message });
  }
};

module.exports = {
  fetchAll,
  fetchById,
  create
};