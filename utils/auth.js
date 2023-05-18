require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      name: user.name,
      email: user.email,
    },
    process.env.ACCESSS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

module.exports = {
  generateToken,
};
