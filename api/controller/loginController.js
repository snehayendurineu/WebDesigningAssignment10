const authService = require('../service/service');

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("in login Controller")
    const result = await authService.authenticateUser(email, password);

    if (result.error) {
      res.status(401).json({ error: result.error });
    } else {
   
      const { user, token } = result;
      res.json({ user, token });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { loginController };
