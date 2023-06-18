//declaring variables
let express = require('express');
let app = express();

const bodyparser = require('body-parser');
const session = require('express-session');
const{ v4:uuidv4 } = require('uuid');
const router = require('./router');

app.set('view engine', 'ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

//declaring the links and rendering of pages
app.get('/', (req,res)=>{
    res.render('pages/home');
});
app.get('/about', (req,res)=>{
    res.render('pages/about');
});
app.get('/projects', (req,res)=>{
    res.render('pages/projects');
});
app.get('/contact', (req,res)=>{
    res.render('pages/contact');
});
app.get('/services', (req,res)=>{
    res.render('pages/services');
});
app.get('/login', (req,res)=>{
    res.render('pages/login');
});
app.get('/register', (req,res)=>{
    res.render('pages/register');
});
app.get('public/pdf/myresume.pdf', function(req, res) {  
    res.download('public/pdf/myresume.pdf');
});

app.use(session({
    secret: uuidv4(), 
    resave: false,
    saveUninitialized: true
    }));

//declaring the public folder and the init of the page on port 4000
app.use('/route', router);
app.use(express.static('public'));
app.listen(4000);