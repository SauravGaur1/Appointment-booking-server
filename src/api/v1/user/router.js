const { Router } = require('express');
const router = Router();
const { getCurrentUser, updateProfile, getAllPublicProfiles } = require('./controller');
const { authenticate } = require('../../../middlewares/authenticate');
const { updateProfileSchema } = require('./validations');
const { validate } = require('../../../middlewares/joivalidators');

router.get('/', getAllPublicProfiles);

router.get('/me', authenticate, getCurrentUser);

router.put('/profile', authenticate, validate(updateProfileSchema), updateProfile);

module.exports = router;