const {promisify} = require('util');
const jwt = require('jsonwebtoken'); 

const userModel = require('../Model/userModel');
const tagModel = require('../Model/tagModel');

const asyncCatch = require('../utils/asyncCatch');
const appError = require('../utils/appError');


const signToken = (id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}

const createAndSendToken = (user, res, statusCode)=>{
  //1. creating token
  const token = signToken(user._id);

  //2. configure token based on dev or prod env. to be sent as cookie to client
  const cookieOptions = {
    //For cookie options the time should be set in milliSeconds while fpr the jwt sign it can be set in days as 1d, 2d etc.
    expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
    //to make sure jwt is not tampered with in the browser
    httpOnly: true,
  };
  //IN dev postman app cannot use https to send cookies. Localhost will not transmit cookie as we are not using https.
  process.env.NODE_ENV === 'production'?cookieOptions.secure = true:'';

  //sending the cookie with jwt token, res.cookie(<name of the cookie as string>, <what is to be stored in the cookie>,{<options>})
  res.cookie("tweetagJWTCookie", token, cookieOptions);

  //Remove password from showing up in the user response
  user.password = undefined;
  //3. Send the res to client
  res.status(statusCode).json({
    status: 'success',
    // token,
    data:{
      user: user._id, 
    }
  });
}

exports.signup = asyncCatch(async(req,res,next)=>{
  //inserting into the db.
  const newUser = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    DOB: req.body.DOB,
  });

  //create and send jwt token
  createAndSendToken(newUser, res, 201);
});

exports.login =asyncCatch(async(req,res,next)=>{
  const {email, password} = req.body;
  
  //1) check of email and passwrd are present in the body
  if(!email||!password){
    const message = 'Both email and password are required.'
    return next(new appError(message, 400)); 
  }
  //2) check if email and password match with db
  const existUser = await userModel.findOne({email}).select("+password");

  let passswordMatch= '';
  if(existUser) passswordMatch = await existUser.correctPassword(existUser.password, password);

  if(!existUser||!passswordMatch){
    return next(new appError('email and/or password do not match.',401));
  }

  //3) create and send jwt.
  createAndSendToken(existUser, res, 200);
});

exports.logout = (req,res,next)=>{
  //As Http only is set to true we cannot delete the cookie hence we are replacing the cookie with a generic one with an expiration time of 10 seconds.
  res.cookie('tweetagJWTCookie', 'LoggedOut', {
    expires: new Date(Date.now()+10*1000),
    httpOnly: true
  });
  res.status(200).json({status:'Sucess'});
}

exports.protect = asyncCatch(async(req,res,next)=>{
  //TBD: need to verify if bearer token works in browser 
  //1> check if token exists
  let token;
  //if bearer token exists (as environment variable in PostMan)
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
  }
  //To get token from browser cookies (name givenfor the token is tweetagJWTCookie)
  else if(req.cookies.tweetagJWTCookie){
    token = req.cookies.tweetagJWTCookie;
  }
  if(!token){
    return next(new appError('Token does not exist',401));
  }

  //2> When token exists verify if the token is correct //using jwt.verify to verify the token but jwt.verify returns a promise hence needs to be promisified and awaited. //promisify is the function of the node.js that needs to be required from 'util' module of node. //jwt.verify method takes in 2 arguments the token and the secret
  const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
  //3> check if the user exists in the dB //this returns an object. However if using find({_id:decode.id}) returns an array in which case the existUser will need to be checked with length.
  const existUser = await userModel.findById(decoded.id);
  if(!existUser) return next(new appError('This user does not exist', 400));

  req.user = existUser;
  //valid for the life time of the req. res.locals available only to the view(s) rendered during that request / response cycle (if any)
  res.locals.user = existUser;
  //Grant access to protected route
  next();
});

exports.userExists = (req,res,next)=>{
  if(res.locals){
    res.status(200).json({
      status: 'success',
      data:{
        user: res.locals.user._id, 
      }
    });
  }
}

//For deleting and upating posts make sure the tag exists and belongs ot the user requesting the update/delete
//check if the tag exists
  exports.matchIds = asyncCatch(async(req,res,next)=>{
    const modifyTag = await tagModel.findById(req.body.tagID);
    if(!modifyTag) return next(new appError('No Tag found that matches your delete request',404));
    //check if the user has the permission to delete the tag (is it his or her own tag?)
    else if((modifyTag.user[0]._id).toString()!==req.body.userID) {
      console.log(req.body)
    return next(new appError('Not your Tag to delete',400));
  }
  next();
});
