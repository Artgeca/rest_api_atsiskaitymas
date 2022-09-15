const mongoose = require('mongoose');

const removeEmptyProps = (obj) => Object.entries(obj).reduce((prevResult, [key, value]) => {
  if (value !== undefined) {
    prevResult[key] = value;
  }

  return prevResult;
}, {});


const validMongoObjectId = (id) => mongoose.isValidObjectId(id);

module.exports = {
  removeEmptyProps,
  validMongoObjectId
};
