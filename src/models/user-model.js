const { Schema, model } = require('mongoose');
const yup = require('yup');
const TicketModel = require('./ticket-model');

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  },
  tickets: {
    type: [{
      ticketId: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true
      },
      amount: {
        type: Number,
        required: true
      }
    }],
    default: []
  },
}, {
  timestamps: true
});

const ticketValidationSchema = yup.object({
  ticketId: yup.string().typeError('User.tickets ticket.ticketId must be a string')
    .required('User.tickets ticket.ticketId is required')
    .test(
      'ticket-exists',
      'ticket was not found using cartItems element.ticketId ',
      async (ticketId) => {
        const ticketExists = await TicketModel.exists({ _id: ticketId });

        return ticketExists;
      }),
  amount: yup.number().typeError('User.tickets ticket.amount must be a number')
    .required('User.tickets ticket.amount is required')
    .integer('User.tickets ticket.amount must be integer')
    .positive('User.tickets ticket.amount must be positive'),
});

const userValidationSchema = yup.object({
  email: yup.string().typeError('User.email must be a string')
    .required('User.email is required')
    .email('Invalid User.email format')
    .test('email-check', 'User.email already exists', async (email) => {
      const foundUser = await UserModel.findOne({ email });

      return foundUser === null;
    }),
  password: yup.string().typeError('User.password must be a string')
    .required('User.password is required')
    .min(8, 'User.password must have at least 8 symbols')
    .max(32, 'User.password must be no more than 32 symbols')
    .matches(/[a-z]/, 'User.password must have at least one lowercase letter')
    .matches(/[A-Z]/, 'User.password must have at least one uppercase letter')
    .matches(/\d/, 'User.password must have at least one number')
    .matches(/\W/, 'User.password must have at least one special symbol'),
  passwordConfirmation: yup.string().typeError('User.passwordConfirmation must be a string')
    .required('User.passwordConfirmation is required')
    .oneOf([yup.ref('password')], 'User.passwordConfirmation does not match User.password'),
  role: yup.string().typeError('User.role must be a string')
    .oneOf(['USER', 'ADMIN']),
  tickets: yup.array(ticketValidationSchema)
});

const userUpdateValidationSchema = yup.object({
  email: yup.string().typeError('User.email must be a string')
    .email('Invalid User.email format')
    .test('email-check', 'User.email already exists', async (email) => {
      const foundUser = await UserModel.findOne({ email });

      return foundUser === null;
    }),
  password: yup.string().typeError('User.password must be a string')
    .min(8, 'User.password must have at least 8 symbols')
    .max(32, 'User.password must be no more than 32 symbols')
    .matches(/[a-z]/, 'User.password must have at least one lowercase letter')
    .matches(/[A-Z]/, 'User.password must have at least one uppercase letter')
    .matches(/\d/, 'User.password must have at least one number')
    .matches(/\W/, 'User.password must have at least one special symbol'),
  passwordConfirmation: yup.string().typeError('User.passwordConfirmation must be a string')
    .oneOf([yup.ref('password')], 'User.passwordConfirmation does not match User.password'),
  role: yup.string().typeError('User.role must be a string')
    .oneOf(['USER', 'ADMIN']),
  tickets: yup.array(ticketValidationSchema)
});

userSchema.statics.validateUser = (userData) => userValidationSchema.validate(userData);
userSchema.statics.validateUserUpdate = (userData) => userUpdateValidationSchema.validate(userData);
userSchema.statics.validateTicket = (userData) => ticketValidationSchema.validate(userData);

const UserModel = model('User', userSchema);

module.exports = UserModel;
