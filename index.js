const express = require('express');
const app = express();
const path = require('path');
const port = 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public/css')));
app.use(express.static(path.join(__dirname, '/public/js')));
app.use(express.static(path.join(__dirname, '/public/images')));    
app.use(express.urlencoded({extended: true})); // middleware to parse form data



app.get('/',(req,res)=>{
    res.render('home');
}); 

app.get('/about',(req,res)=>{
    res.render('about');
});

app.get('/contact',(req,res)=>{ 
    res.render('contact');
});

// form data
app.post('/contact',(req,res)=>{
    console.log(req.body);
    console.log('Form data received');
    res.redirect('/');
});


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});