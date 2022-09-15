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

const typeValidationSchema = yup.object().shape({
  title: yup
    .string().typeError('Type.title must be a string')
    .required('Type.title is required'),
  img: yup
    .string().typeError('Type.img must be a string')
    .required('Type.img is required'),
});

const typeUpdateValidationSchema = yup.object().shape({
  title: yup
    .string().typeError('Type.title must be a string'),
  img: yup
    .string().typeError('Type.img must be a string'),
});

typeSchema.statics.validateType = (typeData) => typeValidationSchema.validate(typeData);
typeSchema.statics.validateTypeUpdate = (typeData) => typeUpdateValidationSchema.validate(typeData);

const TypeModel = model('Type', typeSchema);

module.exports = TypeModel;
