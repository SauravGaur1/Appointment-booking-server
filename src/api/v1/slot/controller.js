const Slot = require('./model');
const User = require('../user/model.js')
const { sendSuccessResp, sendFailureResp } = require('../../../utils/response');

// Create Slot
const createSlot = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;
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
    const slots = await Slot.find({ ownerId: req.user.id });
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
    const slots = await Slot.find({ ownerId: userId }).select('startTime date endTime status');
    return sendSuccessResp(res, {
      status: 200,
      data: {
        user,
        slots,
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