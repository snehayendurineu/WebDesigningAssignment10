const db = require('../model/dbConnection');
const bcrypt = require('bcrypt');
const userModel = db.user


const authenticateUser = async (email, password) => {

  try {
    const user = await userModel.findOne({ email:email });

    if (!user) {
      return { error: 'Invalid credentials' };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch)

    if (!passwordMatch) {
      return { error: 'Invalid credentials' };
    }

    const token = generateAuthToken(user);
    return { user, token };
  } catch (error) {
    console.error('Error during login:', error);
    return { error: 'Internal server error' };
  }

};

const generateAuthToken = (user) => {
  return user._id;
};

module.exports = { authenticateUser };
