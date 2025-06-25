const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
});

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
  timezone: Joi.string().default('Asia/Kolkata'),
  skills: Joi.string().allow('').optional(),
});

module.exports = {
  loginSchema,
  signupSchema,
};