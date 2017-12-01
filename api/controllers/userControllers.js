const mongoose = require('mongoose');

const User = require('../models/userModels');

const STATUS_USER_ERROR = 422;

const userLogin = (req, res) => {
  const {username, password} = req.body;
  User.findOne({username, password})
    .select('username')
    .exec()
    .then((user) => {
      if(user === null) {
        throw new Error();
      }
      res.json(user);
    })
    .catch(err => res.status(STATUS_USER_ERROR).json({error: err.message}));
};

const userCreate = (req, res) => {
  // const {username, password} = req.body;
  // const newUser = new User({username, password});
  // newUser.save((err, savedUser) => {
  //   if(err) {
  //     res.status(500).json(err);
  //     return;
  //   }
  //   res.json(savedUser);
  // });
  const { username, password } = req.body;
  const newUserModel = new User({ username, password });
  newUserModel
    .save()
    .then((createdUser) => {
      res.json(createdUser);
    })
      .catch((err) => {
        res.status(STATUS_USER_ERROR).json({ errorMessage: err.message });
        return;
      });
};

const listUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json(users);
  });
};

module.exports = {
  userCreate,
  listUsers,
  userLogin
}