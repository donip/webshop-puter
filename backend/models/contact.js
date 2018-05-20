const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const contactSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

contactSchema.plugin(passportLocalMongoose, {
  maxAttempts: 5,
  hashField: 'password',
  usernameField: 'email',
});

module.exports = mongoose.model('Contact', contactSchema);
