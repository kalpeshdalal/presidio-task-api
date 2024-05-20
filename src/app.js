const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const { jwtStrategy } = require('./config/passport');




const app = express();


app.use(morgan.successHandler);
app.use(morgan.errorHandler);


// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json({ limit: '50mb' }));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(xss());
app.use(mongoSanitize());

app.use(compression());

app.use(cors());
app.options('*', cors());


if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}


app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}))
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
// jwt authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use('jwt', jwtStrategy);

app.use('/v1', routes);

app.all('/', (req, res) => {
  res.send("Hello from KD's API")
});

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
