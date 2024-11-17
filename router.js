var express = require('express');
const { client } = require('./db');
var router = express.Router();
const passport = require('passport');


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      req.session.user = user.email;
      res.redirect('/contacts');
    } else {
        res.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).end("Internal Server Error");
  }
});


module.exports = router;