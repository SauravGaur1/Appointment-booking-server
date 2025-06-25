const { Router } = require('express');
const router = Router();

const { bookSlot, getMyBookings } = require('./controller');
const { authenticate } = require('../../../middlewares/authenticate');
const { validate } = require('../../../middlewares/joivalidators');
const { bookSlotSchema } = require('./validations');

router.post('/', authenticate, validate(bookSlotSchema), bookSlot);

router.get('/mine', authenticate, getMyBookings);

module.exports = router;