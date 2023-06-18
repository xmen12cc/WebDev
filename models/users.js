const mongoose = require('mongoose');
// Define the schema for your data
const userSchema = new mongoose.Schema({
    username: String,
    email: String
    },
    {
      collection: "users"
  });
  
  // Create a model based on the schema
  const User = mongoose.model('User', userSchema);
  
  // Export the model for use in other parts of your application
module.exports = User;