const mongoose = require('mongoose');
const Filter = require('bad-words');

const tagSchema = new mongoose.Schema({
  tag:{
    type: String,
    length: 250,
    required:[true, 'tagging without a tag? You need to have a tag.']
  },
  category:{
    type: String,
    enum: ['General', 'Fun', 'LOTR', 'Anime'],
    default: 'General'
  },
  //child referencing
  user:[ {
      type: mongoose.Schema.ObjectId,
      ref:'User'
  }],
}, {
  timestamps:true
});

//middleware before persisting to dB to clean profanity.
tagSchema.pre('save', async function(next){
  filter = new Filter();
  this.tag = filter.clean(this.tag);
});

//middleware to populate the results of the find tags with child referencing documents
tagSchema.pre(/^find/, function (next){
  this.populate({
    //path is the child refernce name in the tagSchema.
    path: 'user',
    //-to remove +to add the document fields. Here removing all fields except name.
    select: '-email -DOB -__v'
  });
  next();
})

const tag = mongoose.model('tag',tagSchema);
module.exports = tag;