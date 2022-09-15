const { Schema, model } = require('mongoose');
const yup = require('yup');

const typeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

const TypeModel = model('Type', typeSchema);

module.exports = TypeModel;
