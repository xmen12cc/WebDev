let mongoose = require('mongoose');

//Schema model for the messages database collection
let messageModel = mongoose.Schema({
  Name: String,
  LastName: String,
  ContatNum: Number,
  Email: String,
  Message: String
}, {
  collection: "messages"
});

//exporting the module so that it can be used on the index.js file
module.exports = mongoose.model('Message', messageModel);