const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require("body-parser");
const session = require("express-session");
const{v4:uuidv4} = require("uuid")
const router=require('./router.js')

const port = 8000;
app.set('view engine','ejs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))



// load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))


app.use(session({
  secret:uuidv4(),
  resave:false,
  saveUninitialized:false
}));

app.use('/route',router)

const checkAuth = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/route/home'); 
  }
  next();
};
// Home route
app.get('/',checkAuth,(req,res)=>{
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.render('base',{title:"Login System"});
})



app.listen(port)