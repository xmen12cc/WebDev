//declaring variables
let express = require('express');
let app = express();

app.set('view engine', 'ejs');

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
});2
app.get('public/pdf/myresume.pdf', function(req, res) {  
    res.download('public/pdf/myresume.pdf');
});

function redirectToHomePage() {
    window.location.href = "/";
  }

//declaring the public folder and the init of the page on port 4000
app.use(express.static('public'));
app.listen(4000);