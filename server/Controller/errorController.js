const AppError = require('../utils/appError');

/////////////////
//Handling Mongoose errors that are not hadled anywhere and trickle down to app.js
const handleCastErrorDB = (err)=>{
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
}

const handleDuplicateFieldsDB = (err)=>{
  // const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
  // console.log(value)
  const message = `Duplicate fields value. please use a different one.`;
  return new AppError(message, 400);
}

const handleValidationErrorDB = (err)=>{
  const errors = Object.values(err.errors).map(el=>el.message);
  const message = `Invalid input data: ${errors.join('. ')}`;
  return new AppError(message, 400);
}

const handleJWTError = ()=> new AppError('Invalid Token.Please log in again', 401);
const handleTokenExpiredError = ()=> new AppError('Your token has expired. Please log in again!', 401);

/////////////////

const sendDevError = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendProdError = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //Programming errors or other errors of unknown origins
    //Log error for developer knowledge
    console.log('Error ' + err);
    return res.status(500).json({
      status:'Error',
      message: 'Opps! this is embarrassing... Something went wrong, we will fix it soon...'
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';

  if (process.env.NODE_ENV === 'development') {
    sendDevError(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = err; //should have been {...err} but because of the depth of the err obj depending on the type pf error. Doesn't always work.
    if (error.name === 'CastError') error = handleCastErrorDB(error); //To handle no coerceable strings etc.
    if (error.code === 11000) error = handleDuplicateFieldsDB(error); //DB error when unique fields get duplicate data.
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error); //other validation error coming from mongoose.
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExporedError') error = handleTokenExpiredError();
    sendProdError(error, req, res);
  }
};
