// const path = require('path');
const express = require('express');

const app = express();

// Access enviorment variables

require('dotenv').config();

// Initializes webpack functions on the server, and compiles.

const webpack = require('webpack');
const devserver = require('webpack-dev-middleware');
const hotmodule = require('webpack-hot-middleware');
const webpackconfig = require('../webpack.config.js');

const compiler = webpack(webpackconfig);

// Sets port to 3000, and defaults to development mode unless specified in NODE_ENV

const PORT = 3000;
const ENV = process.env.NODE_ENV || 'development';

// Setup Morgan logger and set to skip all JSON files

const morgan = require('morgan');

function skipLog(req) {
  let url = req.url;
  if (url.indexOf('?') > 0) {
    url = url.substr(0, url.indexOf('?'));
  }
  if (url.match(/(json)$/ig)) {
    return true;
  }
  return false;
}

app.use(morgan('dev', {
  skip: skipLog,
}));

// Setup Knex files, include Knex logger and connect to database

const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig[ENV]);
const knexLogger = require('knex-logger');

app.use(knexLogger(knex));

// Seperate route requires


const mainRoute = require('./routes/main');
const userRoute = require('./routes/user');
const spotifyRoute = require('./routes/spotify');
// This is for body parser
const bodyParser = require('body-parser');

app.use(bodyParser.json({
  extended: true,
}));

// Cookie logic

const shortid = require('shortid');
const expressSession = require('express-session');
const passport = require('passport');

app.use(expressSession({
  secret: 'this is a random string',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60000 },
}));

app.use((req, res, next) => {
  if (!req.session.user_cookie) {
    req.session.user_cookie = shortid.generate();
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());


// Pulls static files from build folder if prod mode, otherwise start webpack dev server, hotmodule

if (ENV === 'production') {
  app.use(express.static('build'));
} else {
  app.use(devserver(compiler, {
    watchOptions: {
      poll: 1000,
      ignored: /node_modules/,
    },
    noInfo: true,
    stats: {
      colors: true,
    },
  }));
  app.use(hotmodule(compiler));
}

// If we want to make modules of the routes, 'require' them, use express.Router(); in those files
// eg. https://stackoverflow.com/questions/28305120/differences-between-express-router-and-app-get

// Mount all route files

app.use(mainRoute(knex));
app.use(userRoute(knex));
app.use(spotifyRoute(knex));

// Starts the server

app.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT} in ${ENV} mode. Wait for compile...`));
