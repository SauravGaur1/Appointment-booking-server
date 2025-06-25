const { Router } = require('express');
const router = Router();

const { createSlot, getMySlots, deleteSlot, getPublicProfileAndSlots } = require('./controller');
const { authenticate } = require('../../../middlewares/authenticate');
const { createSlotSchema } = require('./validations');
const { validate } = require('../../../middlewares/joivalidators');

// Create Slot
router.post('/', authenticate, validate(createSlotSchema), createSlot);

// Get My Slots
router.get('/mine', authenticate, getMySlots);

// Delete Slot
router.delete('/:slotId', authenticate, deleteSlot);


router.get('/:userId', getPublicProfileAndSlots);

module.exports = router;