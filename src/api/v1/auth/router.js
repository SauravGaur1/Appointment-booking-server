const { Router } = require("express");
const router = Router();

const { validate } = require("../../../middlewares/joivalidators.js");
const {
  signupSchema,
  loginSchema
} = require('./validations.js');
const {
  register,
  login
} = require('./controller.js');

router.post('/register', [
  validate(signupSchema),
  register
]);

router.post('/login', [
  validate(loginSchema),
  login
]);

module.exports = router;