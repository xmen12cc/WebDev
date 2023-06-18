//declaring variables
const mongoose = require('mongoose');
const User = require('./models/users'); 
const { Db } = require('mongodb');

//Connecting to mongodb database
const uri = "mongodb+srv://xmen12c:alberto123@cluster0.9cmasak.mongodb.net/?retryWrites=true&w=majority";
     mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
       .then(() => {
         console.log('Connected to the database');
       })
       .catch((error) => {
         console.error('Error connecting to the database:', error);
       });
       async function addUserToDatabase(username, email, password) {
         try {
           const newUser = new User({
             username,
             email,
             password
           });
           const savedUser = await newUser.save();
           console.log('User saved:', savedUser);
         } catch (error) {
           console.error('Error saving user:', error);
         }
       }
       
       // Example usage to add user to database manually using function:
       //addUserToDatabase('Alberto_Mcwhirter', 'alberto@example.com', 'password123');
       