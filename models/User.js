const { Schema, model } = require('mongoose');

const User = new Schema({
  name: { type: String, required: true },
  pass: { type: String, required: true },
});

module.exports = model('User', User);