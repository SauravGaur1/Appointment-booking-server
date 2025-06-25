const Joi = require('joi');

const updateProfileSchema = Joi.object({
  skills: Joi.array().min(1),
  bio: Joi.string().allow('').optional(),
});

module.exports = {
  updateProfileSchema,
};