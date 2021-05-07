const Router = require('express')
const productRouter = new Router()
const productController = require("../controllers/productController")

productRouter.post("/", productController.addProduct)
productRouter.get("/", productController.getProduct)
productRouter.put("/", productController.changeProduct)
productRouter.delete("/", productController.deleteProduct)


module.exports = productRouter
