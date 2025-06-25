const { registerUser, loginUser } = require('./services/userService');
const { sendSuccessResp, sendFailureResp } = require('../../../utils/response');

const register = async (req, res) => {
  try {
    const { name, email, password, timezone, skills } = req.body;
    const { token, user } = await registerUser({ name, email, password, timezone, skills });
    return sendSuccessResp(res, {
      status: 201,
      data: { token, user },
    });
  } catch (err) {
    return sendFailureResp(res, {
      status: err.statusCode || 500,
      data: { message: err.message },
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser({ email, password });
    return sendSuccessResp(res, {
      status: 200,
      data: { token, user },
    });
  } catch (err) {
    return sendFailureResp(res, {
      status: err.statusCode || 500,
      data: { message: err.message },
    });
  }
};

module.exports = { register, login };