const tagModel = require('../Model/tagModel');
const asyncCatch = require('../utils/asyncCatch');

exports.getMyTags = asyncCatch(async(req, res, next)=>{
  const myTags = await tagModel.find({user:req.user.id}).sort({ updatedAt: -1 });
  res.status(200).json({
    status: 'Success',
    myTags
  });
});
