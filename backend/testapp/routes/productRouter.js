const express = require('express')
const productRouter = express.Router()
const productController = require("../controllers/productController")
const jsonParser = express.json()
const multer = require("multer")

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})

const upload = multer({ storage: storageConfig })

productRouter.post("/", [
  jsonParser,
  upload.single("image")
], productController.addProduct)
productRouter.get("/", productController.getProduct)
productRouter.put("/", productController.changeProduct)
productRouter.delete("/", productController.deleteProduct)


module.exports = productRouter
