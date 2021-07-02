const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const User = require('../models/User')

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        massage: 'Некорректные данные при регистрации'
      })
    }

    const { email, password } = req.body

    const candidate = await User.findOne({ email })

    if (candidate) {
      return res.status(400).json({ massage: 'Такой пользователь уже существует' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, password: hashedPassword })

    await user.save()

    res.status(201).json({ massage: 'Пользователь создан' })



  } catch (e) {
    res.status(500).json({ massage: 'Что-то пошло не так' })
  }
}

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        massage: 'Некорректные данные при входе'
      })
    }

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ massage: 'Пользователь не найден' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ massage: 'Неверный пароль, попробуйте снова' })
    }

    const token = jwt.sign(
      { id: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    )

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
      }
    })

  } catch (e) {
    res.status(500).json({ massage: 'Что-то пошло не так' })
  }
}