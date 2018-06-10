require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const User = require('./models/user');
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGODB_URI, { useMongoClient: true })
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'App Store';


app.use(
  cors({
    credentials: true,                 // allow other domains to send cookies
    origin: ["http://localhost:4200", "http://localhost:3001"]  // these are the domains that are allowed
  })
);

app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    cb(null, user);
  });
});

passport.use(new LocalStrategy({
  usernameField: "email",
  passReqToCallback: true
}, (req, email, password, next) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect email" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    next(null, user);
  });
}));


app.use(passport.initialize());
app.use(passport.session());


const index = require('./routes/index');
const auth = require('./routes/authRoutes');
const product = require('./routes/productRoutes');
const category = require('./routes/categoryRoutes');
const order = require('./routes/orderRoutes');
const seeds = require('./routes/seedsRoutes');
app.use('/', index);
app.use('/', auth);
app.use('/product', product);
app.use('/category', category);
app.use('/order', order);
app.use('/seeds', seeds);


module.exports = app;
