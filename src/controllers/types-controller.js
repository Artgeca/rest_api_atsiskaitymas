const { validMongoObjectId, removeEmptyProps } = require('../helpers');
const { sendErrorResponse, createNotFoundError } = require('../helpers/error');
const TypeModel = require('../models/type-model');

const createTypeNotFoundError = (typeId) => createNotFoundError(`Type with id: '${typeId}' not found`);

const fetchAll = async (req, res) => {
  try {
    const typeDocuments = await TypeModel.find();
    res.status(200).json(typeDocuments);
  } catch (err) { sendErrorResponse(err, res); }
};

const fetchById = async (req, res) => {
  const id = req.params.id;

  try {
    if (!validMongoObjectId(id)) throw createTypeNotFoundError(id);

    const type = await TypeModel.findById(id);

    if (type === null) throw createTypeNotFoundError(id);

    res.status(200).json(type);
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newTypeData = req.body;

  try {
    await TypeModel.validateType(newTypeData);

    const newType = await TypeModel.create({ ...newTypeData });

    res.status(201).json(newType);
  } catch (err) { sendErrorResponse(err, res); }
};

const replace = async (req, res) => {
  const id = req.params.id;
  const newTypeData = req.body;

  try {
    if (!validMongoObjectId(id)) throw createTypeNotFoundError(id);

    await TypeModel.validateType(newTypeData);

    const type = await TypeModel.findByIdAndUpdate(id, newTypeData, { new: true, runValidators: true });

    if (type === null) throw createTypeNotFoundError(id);

    res.status(200).json(type);
  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const id = req.params.id;
  const { title, img } = req.body;
  const newTypeData = removeEmptyProps({ title, img });

  try {
    if (!validMongoObjectId(id)) throw createTypeNotFoundError(id);

    await TypeModel.validateTypeUpdate(newTypeData);

    const type = await TypeModel.findByIdAndUpdate(id, newTypeData, { new: true });

    if (type === null) throw createTypeNotFoundError(id);

    res.status(200).json(type);
  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    if (!validMongoObjectId(id)) throw createTypeNotFoundError(id);

    const type = await TypeModel.findByIdAndDelete(id);

    if (type === null) throw createTypeNotFoundError(id);

    res.status(200).json(type);
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
