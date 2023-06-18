let mongoose = require('mongoose');

//Schema model for the users database collection
let userModel = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  contactNumber: String
}, {
  collection: "users"
});

//exporting the module so that it can be used on the index.js file
module.exports = mongoose.model('User', userModel);