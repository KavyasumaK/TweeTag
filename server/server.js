//Mongoose to connect to MongoDB.
const mongoose = require('mongoose');
//To establish environment variables before app is loaded.
const dotenv = require('dotenv');


//configuring the dotenv config path
dotenv.config({path:'./config.env'});

//To handle uncaughtexceptions from synchronous code not related to express or mongoose.
process.on('uncaughtException',err=>{
  //Log the message and error
  console.log('Uncaught exception server shutting down....');
  console.log(err);
  //gracefull shutdown with 'failure' code. failure code Default = 0 (success)
  process.exit(1);
});


//DB connection configuration
let DBString= process.env.NODE_ENV==='production'?process.env.DEVDB:process.env.PRODDB;

//connect to db. if rejected handle at the end.
mongoose.connect(DBString,{
  useNewUrlParser:true,
  useUnifiedTopology: true,
}).then(console.log(`DB connection successfull...`));



//Entry point to server
const app = require('./app');

//Server to listen on certain port.
const port = process.env.PORT;
const server = app.listen(port,()=>{
  console.log(`listening on port ${port}...`);
});

process.on('unhandledRejection', err=>{
  console.log('unhandled Rejection: shutting down server...');
  console.log(err);
  //Gracefull server shutdown: all pending requests are completed before shutdown and the state of the server is saved.
  server.close(()=>process.exit(1));
});


