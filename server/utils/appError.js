//Global error handler class

class AppError extends Error{
  constructor(message, statusCode){
    super(message);
    this.statusCode=statusCode;
    this.status= `${statusCode}`.startsWith('4')?'Fail':'Error';
    //run only for operational errors (used in error controller)
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
  
}

module.exports = AppError;