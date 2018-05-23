const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  invoice: {
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    postcode: {
      type: Number,
    },
  },
  delivery: {
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    postcode: {
      type: Number,
    },
  },
  isAdmin: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

userSchema.plugin(passportLocalMongoose, {
  maxAttempts: 5,
  hashField: 'password',
  usernameField: 'email',
});

module.exports = mongoose.model('User', userSchema);
