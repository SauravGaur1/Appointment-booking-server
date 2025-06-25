const { Router } = require('express');
const router = Router();

const { bookSlot, getMyBookings, getMyBookingsAsClient } = require('./controller');
const { authenticate } = require('../../../middlewares/authenticate');
const { validate } = require('../../../middlewares/joivalidators');
const { bookSlotSchema } = require('./validations');

router.post('/', authenticate, validate(bookSlotSchema), bookSlot);

router.get('/mine', authenticate, getMyBookings);

// GET /api/bookings/my-bookings - as Client
router.get('/my-bookings', authenticate, getMyBookingsAsClient);

module.exports = router;