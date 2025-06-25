const User = require('../../user/model');
const bcrypt = require('bcrypt');
const { createToken } = require('../../../../utils/jwt');
const { customError } = require('../../../../utils/error');
const saltRounds = Number(process.env.BCRYPT_SALT) || 10;

const registerUser = async ({ name, email, password, timezone, skills }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new customError({ message: 'User already exists!', statusCode: 400 });
  }
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const skillsArray = skills ?? [];
  const user = await User.create({ name, email, passwordHash, timezone, skills: skillsArray });
  const token = await createToken({ id: user._id, name: user.name, email: user.email });
  return { token, user };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new customError({ message: "User doesn't exist!", statusCode: 400 });
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw new customError({ message: 'Incorrect password!', statusCode: 400 });
  }
  const token = await createToken({ id: user._id, name: user.name, email: user.email });
  return { token, user };
};

module.exports = { registerUser, loginUser };
