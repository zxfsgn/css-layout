const { Schema, model } = require('mongoose')

const userScheme = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'USER' }
})

module.exports = model('User', userScheme)