const Joi = require('joi');

const bookSlotSchema = Joi.object({
  slotId: Joi.string().required(),
});

module.exports = {
  bookSlotSchema,
};