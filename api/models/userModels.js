const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
  // just as an exmple:
  // todo: {
  //  text: {
  //    type:String,
  //    required: true,
  //  },
  //  completed: {
    // type: String,
    // default: 'incomplete',
    // enum: ['complete', 'incomplete', 'staged']
  //  }
  // },
});

module.exports = mongoose.model('User', userSchema);