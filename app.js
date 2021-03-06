require('dotenv').config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')
// Passport config
require('./config/passport')(passport);



// Connect to Mongo
mongoose.connect( 
  process.env.MongoURL, { 
  useFindAndModify:   false,
  useNewUrlParser:    true,
  useCreateIndex:     true,
  useUnifiedTopology: true
})
.then(() => console.log('Mongo DB Connected...'))
.catch(err => console.log(err));



//EJS
app.use(expressLayouts);
app.set("view engine", "ejs")


// Bodyparser
app.use(express.urlencoded({extended:false}));


// Express Session
app.use(session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    }));

// Passport Middleware from passportjs.org
app.use(passport.initialize());
app.use(passport.session());
 

// Connect Flash
app.use(flash())


// Global Vars
app.use((req,res, next)=>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
next();
});

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));


//create a port to run our app on 
const PORT = process.env.PORT || 5000;

//write npm run dev in terminal to start 
app.listen(PORT, console.log(`Server started on port ${PORT}`));
