const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const helmet = require('helmet');
const cors = require('cors');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./config/database.js');
const User = require('./models/user');
const userRouter = require('./route/user.route');
const blogpostRouter = require('./route/blogpost.route');
const productRouter = require('./route/product.route');
const nodemailer = require('nodemailer');

const orderRouter = require('./route/order.route');
const useradminRouter = require('./route/useradmin.route');
const Contact = require('./models/contact');
// const contactRouter = require('./route/contact.route');

const logDirectory = path.join(__dirname, 'log');
const port = process.env.PORT || 8080;
const app = express();

// Logging
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory,
});
app.use(morgan('combined', {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode < 400,
}));

// Security
app.use(helmet());

// Body Parse middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

// Session handling
app.use(session({
  secret: 'secret',
  resave: true,
  httpOnly: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // seconds which equals 1 week
  },
}));

// Passport - Auth
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to MongoDB
mongoose.connect(db.uri, db.options)
  .then(() => {
    console.log('MongoDB connected.');
  })
  .catch((err) => {
    console.error(`MongoDB error.:${err}`);
  });

// Enable CORS
app.use(cors({
  credentials: true,
  origin: 'http://localhost:4200',
}));

// User User router
app.use('/user/', userRouter);
app.use('/blogpost/', blogpostRouter);

// product router
app.use('/product/', productRouter);

// order router
app.use('/order/', orderRouter);

// useradmin router
app.use('/useradmin/', useradminRouter);

// contact router
// app.use('/contact/', contactRouter);


// Start server
app.listen(port);

app.use('/uploads', express.static('./uploads'));

/**
 * @todo külön alkalmazásban már működik, itt még a clg(req.body) sem látszik
 */

app.post('/contact/register', (req, res) => {
  const output = `
    <p>incoming message from a client</p>
    <p>Email: ${req.body.email}</p>
    <p>Email: ${req.body.message}</p>
    `;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pjutoersmitt@gmail.com',
      pass: 'kiafaszagyerek',
    },
  });
  const mailOptions = {
    from: 'youremail@gmail.com', // X-Google-Original-From:
    to: 'pjutoersmitt@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was not easy!',
    html: output,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${  info.response}`);
      res.render('contact', { msg: 'Email has been sent' });
    }
  });
  Contact.register(new Contact({
    username: req.body.username,
    email: req.body.email,
    isAdmin: req.body.isAdmin,
  }), req.body.password)
    .then(() => res.json({
      success: 'Sikeres regisztráció a server útvonalon',
    }))
    .catch(err => res.send(err));
});
