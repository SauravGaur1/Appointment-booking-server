const Slot = require('./model');
const User = require('../user/model.js')
const { sendSuccessResp, sendFailureResp } = require('../../../utils/response');

// Create Slot
const createSlot = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;

    // Check for overlapping slots
    const overlap = await Slot.findOne({
      ownerId: req.user.id,
      date,
      $or: [
        { startTime: { $lt: new Date(endTime) }, endTime: { $gt: new Date(startTime) } }
      ]
    });
    if (overlap) {
      return sendFailureResp(res, {
        status: 400,
        data: { message: 'Slot overlaps with an existing slot.' },
      });
    }

    const slot = await Slot.create({
      ownerId: req.user.id,
      date,
      startTime,
      endTime,
      status: 'available',
    });
    return sendSuccessResp(res, {
      status: 201,
      data: slot,
    });
  } catch (err) {
    return sendFailureResp(res, {
      status: 500,
      data: { message: err.message },
    });
  }
};

// Get My Slots
const getMySlots = async (req, res) => {
  try {
    const slots = await Slot.find({ ownerId: req.user.id })
      .sort({ date: 1, startTime: 1 });
    return sendSuccessResp(res, {
      status: 200,
      data: slots,
    });
  } catch (err) {
    return sendFailureResp(res, {
      status: 500,
      data: { message: err.message },
    });
  }
};

// Delete Slot
const deleteSlot = async (req, res) => {
  try {
    const { slotId } = req.params;
    const slot = await Slot.findOneAndDelete({ _id: slotId, ownerId: req.user.id });
    if (!slot) {
      return sendFailureResp(res, {
        status: 404,
        data: { message: 'Slot not found or not authorized' },
      });
    }
    return sendSuccessResp(res, {
      status: 200,
      data: { message: 'Slot deleted' },
    });
  } catch (err) {
    return sendFailureResp(res, {
      status: 500,
      data: { message: err.message },
    });
  }
};

const getPublicProfileAndSlots = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('name skills bio');
    if (!user) {
      return sendFailureResp(res, {
        status: 404,
        data: { message: 'User not found' },
      });
    }
    // Find and sort slots by date and startTime ascending
    const slots = await Slot.find({ ownerId: userId, status: 'available' })
      .select('date startTime endTime status')
      .sort({ date: 1, startTime: 1 })
      .lean();

    return sendSuccessResp(res, {
      status: 200,
      data: {
        user,
        slots, // This is now a sorted array
      },
    });
  } catch (err) {
    return sendFailureResp(res, {
      status: 500,
      data: { message: err.message },
    });
  }
};

module.exports = { createSlot, getMySlots, deleteSlot, getPublicProfileAndSlots };