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

const User = require('./models/users');
const Message = require('./models/message');

//set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//declaring the links and rendering of pages
app.get('/', (req, res) => {
  res.render('pages/home');
});
app.get('/about', (req, res) => {
  res.render('pages/about');
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
app.get('/login', (req, res) => {
  res.render('pages/login');
});

app.get('/register', (req, res) => {
  res.render('pages/register');
});
app.get('/editUser', (req, res) => {
  res.render('pages/editUser');
});
app.get('/contacts/add', (req, res) => {
  res.render('pages/addUser');
});
app.get('/public/pdf/myresume.pdf', function (req, res) {
  res.download('public/pdf/myresume.pdf');
});

app.use(session({
  secret: uuidv4(),
  resave: false,
  saveUninitialized: true
}));

// Fetch the data from mongodb database to the webpage /contacts also it sorts them alphabetically
app.get('/contacts', async (req, res) => {
  try {
    const users = await User.find().sort({ username: 1 });
    res.render('pages/contacts', { userList: users });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Find user by id and call editUser to edit its contents
app.get('/contacts/edit/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render('pages/editUser', { user: user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Update the contents of the users
app.post('/contacts/update/:id', async (req, res) => {
  try {
    const { username, contactNumber, email } = req.body;
    await User.findByIdAndUpdate(req.params.id, { username, contactNumber, email });
    res.redirect('/contacts');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Find user by id and deletes it from the db and from the table
app.get('/contacts/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.redirect('/contacts');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Function to add a new user to the db and the table, enter username, contactnum and email to add a new user
app.post('/contacts/add', async (req, res) => {
  try {
    const { username, contactNumber, email } = req.body;
    const user = new User({ username, contactNumber, email });
    await user.save();
    res.redirect('/contacts');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

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
