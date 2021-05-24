const { Schema, model } = require('mongoose')

const productScheme = new Schema({
  name: String,
  price: Number,
  img: String
})

const Product = model("Product", productScheme)
module.exports = Product