const User = require('./model');
const { sendSuccessResp, sendFailureResp } = require('../../../utils/response');

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');
    if (!user) {
      return sendFailureResp(res, {
        status: 404,
        data: { message: 'User not found' },
      });
    }
    return sendSuccessResp(res, {
      status: 200,
      data: user,
    });
  } catch (err) {
    return sendFailureResp(res, {
      status: 500,
      data: { message: err.message },
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { skills, bio } = req.body;
    const skillsArray = skills ?? [];
    const updateFields = {};
    if (skillsArray !== undefined) updateFields.skills = skillsArray;
    if (bio !== undefined) updateFields.bio = bio;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateFields,
      { new: true }
    ).select('-passwordHash');
    return sendSuccessResp(res, {
      status: 200,
      data: user,
    });
  } catch (err) {
    return sendFailureResp(res, {
      status: 500,
      data: { message: err.message },
    });
  }
};

const getAllPublicProfiles = async (req, res) => {
  try {
    // Select only public fields
    const users = await User.find().select('_id name email skills bio');
    return sendSuccessResp(res, {
      status: 200,
      data: users,
    });
  } catch (err) {
    return sendFailureResp(res, {
      status: 500,
      data: { message: err.message },
    });
  }
};

module.exports = { getCurrentUser, updateProfile, getAllPublicProfiles };