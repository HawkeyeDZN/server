const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require('express-validator');

router.post('/register', [
  check('username', "Имя пользователя не может быть пустым!").notEmpty(),
  check('password', "Пароль должен быть не меньше 6 символов").isLength({ min: 6 })
], controller.registration);
router.post('/login', controller.login);
router.get('/work', controller.getWork);
module.exports = router
