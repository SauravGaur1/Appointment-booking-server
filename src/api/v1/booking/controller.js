const Booking = require('./model');
const User = require('../user/model');
const Slot = require('../slot/model');
const { sendSuccessResp, sendFailureResp } = require('../../../utils/response');

// Book a Slot
const bookSlot = async (req, res) => {
  try {
    const { slotId } = req.body;
    // Find the slot and ensure it's available
    const slot = await Slot.findOne({ _id: slotId, status: 'available' });
    if (!slot) {
      return sendFailureResp(res, {
        status: 400,
        data: { message: 'Slot not available' },
      });
    }
    // Get current user info
    const user = await User.findById(req.user.id).select('name email');
    if (!user) {
      return sendFailureResp(res, {
        status: 404,
        data: { message: 'User not found' },
      });
    }
    // Create booking
    const booking = await Booking.create({
      slotId,
      professionalId: slot.ownerId,
      userId: req.user.id,
      name: user.name,
      email: user.email,
    });
    // Mark slot as booked
    slot.status = 'booked';
    await slot.save();
    return sendSuccessResp(res, {
      status: 201,
      data: booking,
    });
  } catch (err) {
    return sendFailureResp(res, {
      status: 500,
      data: { message: err.message },
    });
  }
};

// Get My Bookings (as Professional)
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ professionalId: req.user.id })
      .populate({
        path: 'slotId',
        select: 'date startTime endTime status',
        options: { sort: { date: 1, startTime: 1 } }
      })
      .populate('userId', 'name email');
    return sendSuccessResp(res, {
      status: 200,
      data: bookings,
    });
  } catch (err) {
    return sendFailureResp(res, {
      status: 500,
      data: { message: err.message },
    });
  }
};

// Get My Bookings (as Client)
const getMyBookingsAsClient = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate({
        path: 'slotId',
        select: 'date startTime endTime status',
        options: { sort: { date: 1, startTime: 1 } }
      })
      .populate('professionalId', 'name email');
    return sendSuccessResp(res, {
      status: 200,
      data: bookings,
    });
  } catch (err) {
    return sendFailureResp(res, {
      status: 500,
      data: { message: err.message },
    });
  }
};

module.exports = { bookSlot, getMyBookings, getMyBookingsAsClient };