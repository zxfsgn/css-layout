const Product = require("../models/Product")

exports.addProduct = async (req, res) => {

  const img = `${req.file.path}`;
  const { name, price } = req.body
  const product = new Product({ name, price, img })

  await product.save()


  res.status(201).json({ massage: 'Продукт добавлен' })
}

exports.getProduct = async (req, res) => {
  const products = await Product.find({})
  res.send(products)
}

exports.changeProduct = async (req, res) => {
  const { oldName, oldPrice, oldImage, name, price, image } = req.body
  await Product.updateOne({ oldName, oldPrice, oldImage }, { name, price, image })
}

exports.deleteProduct = async (req, res) => {
  const { name, price, image } = req.body

  await Product.deleteOne({ name, price, image })

}