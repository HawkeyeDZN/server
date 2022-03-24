const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const res = require('express/lib/response');

const generateAccessToken = (id) => {
  const payload = {
    id
  }
  return jwt.sign(payload, secret, { expiresIn: "12h" })
}

class authController {
  async registration(req, res) {
    try {
      console.log(req.body);
      const { name, pass } = req.body
      
      const hashPass = bcrypt.hashSync(pass, 7);
      const user = new User({ name, pass: hashPass });
      await user.save();
      res.json({
        status: true,
        message: "Вы успешно зарегистрировались!"
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        status: false,
        message: 'Ошибка регистрации'
      });
    }
  }


  async login(req, res) {
    try {
      console.log(req.body);
      const { name, pass } = req.body
      const user = await User.findOne({ name })
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "Пользователь не найден!"
        });
      }
      const validPassword = bcrypt.compareSync(pass, user.pass);
      console.log(user.body);
      if (!validPassword) {
        return res.status(400).json({
          status: false,
          message: "Неправильный пароль, повторите снова!"
        });
      }
      // const token = generateAccessToken(user);
      res.json({
        status: true,
        message: "Вы успешно прошли авторизацию на сайт интернет-магазин одежды!",
        
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        status: false,
        message: 'Ошибка логина'
      });
    }
  }

  async getWork(req, res) {
    try {
      res.json("Сервер работает")
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Сервер не работает' });
    }
  }
}

module.exports = new authController();