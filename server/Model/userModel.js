const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'Username is required'],
  },
  email:{
    type: String,
    required: [true, `email is required`],
    unique: true,
    lowercase: true,//So that there is no mismatch with lower and uppercase letters
    validate: [validator.isEmail, 'Please enter a valid email address']
  },
  DOB:{
    type: Date,
    required: [true, 'Are you older than 18?'],
    validate:[validator.isDate,'DOB must be of the format YYYY/DD/MM']
  },
  password:{
    type: String,
    minlength: 7,
    required:[true, `Password is required`],
    select: false, // not show up in the dowcuments when querying
  },
  passwordConfirm:{
    type: String,
    required:[true, 'Password and Confirm Password must match'],
    //custom validation
    validate: {
      //only works on save and create
      validator: function(val){
        return val===this.password;
      },
      message: 'Please make sure password and confirm password match.'
    },
  }
});

//encrypt password before saving to DB (middleware).
userSchema.pre('save', async function(next){
  //if(!this.isModified('password')) return next();
  //hash password with cost of 8. default is 10, higher the cost higher the security as it is more computer intensive
  this.password = await bcrypt.hash(this.password, 12);
  //works even though password confirm is required field because it is 'required' but doesn't have to persist in the DB
  this.passwordConfirm = undefined;
  next();
});

//static method for confirming passwords
userSchema.methods.correctPassword = async function(dbPassword, enteredPassword){
  //this.password will not be available here as we have set select property on password to false. Hence we pass the this.password as dbPassword here
  return await bcrypt.compare(enteredPassword, dbPassword);
}


const User = mongoose.model('User', userSchema);
module.exports = User;