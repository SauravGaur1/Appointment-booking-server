const { Router } = require('express');
const router = Router();

const authRouter = require('./auth/router.js');
const userRouter = require('./user/router.js');
const slotRouter = require('./slot/router.js');
const bookingRouter = require('./booking/router.js');

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/slots', slotRouter);
router.use('/bookings', bookingRouter);


module.exports = router;