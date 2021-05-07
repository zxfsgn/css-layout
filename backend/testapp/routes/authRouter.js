const { Router } = require('express')
const { check } = require('express-validator')
const authRouter = Router()
const authController = require("../controllers/authController")


authRouter.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля - 6 символов')
      .isLength({ min: 6 })
  ],
  authController.register
)


authRouter.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  authController.login
)

module.exports = authRouter