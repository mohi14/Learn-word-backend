const User = require("../models/Users");
const bcrcypt = require("bcryptjs");
const { generateToken } = require("../utils/auth");

const registerUser = async (req, res) => {
  try {
    const isExist = await User.findOne({ email: req.body.email });

    if (isExist) {
      return res.status(403).send({
        message: `${req.body.email} is already Exist!`,
        status: 403,
      });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrcypt.hashSync(req.body.password),
      });

      const user = await newUser.save();
      const token = generateToken(user);
      res.send({
        user,
        accessToken: token,
        status: 200,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {};

module.exports = { registerUser };
