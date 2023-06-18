const mongoose = require('mongoose');

     const uri = 'mongodb://localhost:4000/mydatabase'; // Replace with your MongoDB connection string

     mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
       .then(() => {
         console.log('Connected to the database');
       })
       .catch((error) => {
         console.error('Error connecting to the database:', error);
       });