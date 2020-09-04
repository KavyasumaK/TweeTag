const express = require('express');

//cookie parser for browser
const cookieParser = require('cookie-parser');

const cors = require('cors');

//security modules
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

//Custom module imports
const userRouter = require('./routes/userRoutes');
const tagRouter = require('./routes/tagRoutes');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./Controller/errorController');

const app = express();

//middleware
app.use(cors({
  allowedHeaders:['Content-Type','Authentication'],
  exposedHeaders:['Content-Range','Content-Type'],
  credentials: true,
  origin:process.env.CORS_ORIGIN}));

//security middleware
//middle ware to parse request body and limit the size of the request to the size of : 10kb
app.use(express.json({limit: '10kb'}));

//To parse cookie coming from the browser.
app.use(cookieParser());

//3rd party security middleware
//Helmet: To protect from well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(helmet());

//limit requests per IP address
const limiter = rateLimit({
  windowMs: 60*60*1000, //time period window in milliseconds - 1 hour here
  max: 100, //limit each IP address to 10 requests per window - these option are saved in the header of the requests
  message: 'Too many request from this IP address, please try again in an hour.'
});
//Known vulnerability: limiter if the app crashes then the limiter is reset.
app.use('/api',limiter);
//Data sanitization against NoSQL query injection where query injection in the header are sanitized.
app.use(mongoSanitize());
//cross site scripting: avoids html code injection when js is code attached to it.
app.use(xss());

//To prevent http parameter pollution attacks: You can whitelist parameters that are to be allowed.
app.use(hpp());

//Router level middleware.
app.use('/api/v1/users',userRouter);
app.use('/api/v1/tags', tagRouter);

//middleware to divert all unhandled routes.
app.all('*',(req,res,next)=>{
  next(new AppError(`${req.originalUrl} Page requested not found`, 404));
});

//Global Error Handler. All errors trickle down here and the response to the client is sent from here. Not ideal for production as we do not want to send all the details to the client. 
app.use(globalErrorHandler);


module.exports = app;

