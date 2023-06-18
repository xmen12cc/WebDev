var express = require('express');
const { client } = require('./Files that prob wont use/db');
var router = express.Router();

const credential = {
    email:"admin@gmail.com",
    password:"admin123"
}

router.post('/login', (req, res)=>{
if(req.body.email == credential.email && req.body.password == credential.password){
req.session.user = req.body.email;
res.redirect('/');
}
else{
    res.end("Invalid Username");
}
});

module.exports = router;