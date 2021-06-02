const express = require('express')
const { check } = require('express-validator')
const authRouter = express.Router()
const authController = require("../controllers/authController")
const jsonParser = express.json()

authRouter.post(
  '/register',
  [
    jsonParser,
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля - 6 символов')
      .isLength({ min: 6 })
  ],
  authController.register
)


authRouter.post(
  '/login',
  [
    jsonParser,
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  authController.login
)

module.exports = authRouter