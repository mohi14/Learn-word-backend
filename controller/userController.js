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

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && bcrcypt.compareSync(req.body.password, user.password)) {
      const accessToken = generateToken(user);
      res.send({
        message: "Logged in successfully",
        status: 200,
        user,
        accessToken,
      });
    } else {
      res.status(401).send({
        message: "Invalid user or password",
        status: 401,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id })
      .exec()
      .then((result) => {
        res
          .status(200)
          .send({
            message: `${result.name} is successfully removed!`,
            status: 200,
          });
      })
      .catch((err) => {
        res.send({
          message: err.message,
        });
      });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = { registerUser, loginUser, getAllUsers, deleteUser };
