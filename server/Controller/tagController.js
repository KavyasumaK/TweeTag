const tagModel = require('../Model/tagModel');

const asyncCatch = require('../utils/asyncCatch');

exports.getTags = asyncCatch(async (req, res, next) => {
  //If category is present get only based on category else get all tags.
  const tags = req.params.category
    ? await tagModel
        .find({ category: req.params.category })
        .sort({ updatedAt: -1 })
    : await tagModel.find().sort({ updatedAt: -1 });

  res.status(200).json({
    status: 'Success',
    tags,
  });
});

//To insert tag, needs to be signed in. coming here after permissionController middleware to check if signed in.
exports.insertTag = asyncCatch(async (req, res, next) => {
  const newTag = await tagModel.create({
    tag: req.body.tag,
    category: req.body.category,
    createdAt: new Date(),
    user: req.user.id,
    //coming from protect middleware in permissionController where user existence in db was verified based on the token and user added to req obj.
  });
  res.status(200).json({
    status: 'sucess',
    data: newTag,
  });
});



//To update tag, needs to be signed in. coming here after permissionController middleware (checked for signin and if the update tag belongs to the current user).
exports.updateTag = asyncCatch(async (req, res, next) => {
  let newTag = {tag:req.body.newTag}
 
  const updatedtag = await tagModel.findByIdAndUpdate(req.params.id,newTag,{
    new:true, //to return new doc instead of the old. Defaults to false.
    runValidators:true, //To run validators set in schema.
    useFindAndModify: false,
  });
  res.status(200).json({
    status:'success',
    updatedtag,
  });
});

//To update tag, needs to be signed in. coming here after permissionController middleware  (checked for signin and if the delete tag belongs to the current user).
exports.deleteTag = asyncCatch(async(req,res,next)=>{
  await tagModel.deleteOne({_id:req.body.tagID}, ()=>{
    res.status(200).json({
      status: 'success',
      data: null
    });
  });
});
