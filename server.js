if(process.env.MODE_ENV !== 'production' && process.env.MODE_ENV !== 'staging'){
    require('dotenv').config()
}
const express = require('express')
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const routes = require('./routes');
const config = require('./config/config');
const { jwtStrategy } = require('./config/passport');

const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express()

//Setup MongoDB
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

//Enable JSON
app.use(express.json())

//NEW NEW NEW NEW
app.use(helmet());

app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

//api routes
app.use('/api', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

//Listen
app.listen(process.env.PORT || 3000)