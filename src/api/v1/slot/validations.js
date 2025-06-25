const Joi = require('joi');

const createSlotSchema = Joi.object({
  date: Joi.string().isoDate().required(), // New required field
  startTime: Joi.date().iso().required(),
  endTime: Joi.date().iso().greater(Joi.ref('startTime')).required(),
});

module.exports = {
  createSlotSchema,
};