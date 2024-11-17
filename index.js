/* Alberto Mcwhirter-Javier
index.js file for my expressJs Ejs portfolio site
2023-06-18
*/

//declaring variables
let express = require('express');
let app = express();
const bodyparser = require('body-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const router = require('./router');

const Message = require('./models/message');

//set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//declaring the links and rendering of pages
app.get('/', (req, res) => {
  res.render('pages/home');
});
app.get('/projects', (req, res) => {
  res.render('pages/projects');
});
app.get('/contact', (req, res) => {
  res.render('pages/contact');
});
app.get('/services', (req, res) => {
  res.render('pages/services');
});

app.get('/public/pdf/myresume.pdf', function (req, res) {
  res.download('public/pdf/myresume.pdf');
});

app.use(session({
  secret: uuidv4(),
  resave: false,
  saveUninitialized: true
}));

app.post('/contact/message', async (req, res) => {
  try {
    const { name, lastName, contactNum, email, message } = req.body;
    const newMessage = new Message({ 
      Name: name,
      LastName: lastName,
      ContactNum: contactNum,
      Email: email,
      Message: message });
    await newMessage.save();
    res.redirect('/contact');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//declaring the public folder and the init of the page on port 4002
app.use('/route', router);
app.use(express.static('public'));
app.listen(4002, () => {
  console.log('Server is running on port 4002');
});
