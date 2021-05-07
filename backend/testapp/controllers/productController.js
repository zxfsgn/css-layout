const Product = require("../models/Product")

addProduct = async (req, res) => {

  const { name, price, image } = req.body
  const product = new Product({ name, price, image })

  await product.save()


  res.status(201).json({ massage: 'Продукт добавлен' })
}

getProduct = async (req, res) => {
  const products = await Product.find({})
  res.send({ products })
}

changeProduct = async (req, res) => {
  const { oldName, oldPrice, oldImage, name, price, image } = req.body
  await Product.updateOne({ oldName, oldPrice, oldImage }, { name, price, image })
}

deleteProduct = async (req, res) => {
  const { name, price, image } = req.body

  await Product.deleteOne({ name, price, image })

}