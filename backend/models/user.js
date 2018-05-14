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
}, {
  timestamps: true,
});

userSchema.plugin(passportLocalMongoose, {
  maxAttempts: 5,
  hashField: 'password',
});

module.exports = mongoose.model('User', userSchema);
