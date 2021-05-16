const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  //标题
  title: {
    type: String,
  },
  html_url: {
    type: String,
  },
  number: {
    type: Number,
  },
  needLoginGithub: {
    type: Boolean,
  },
  labels: [
    {
      id: { type: mongoose.SchemaTypes.ObjectId },
      name: { type: String },
      color: { type: String },
      url: { type: String },
    },
  ],
  //内容
  created_at: {
    type: Date,
  },
  update_at: {
    type: Date,
  },
  body: {
    type: String,
  },
  //留言
  msg: [
    {
      id: { type: mongoose.SchemaTypes.ObjectId },
      name: { type: String },
      msg: { type: String },
      time: { type: Date },
    },
  ],
  //点赞
  like: {
    type: Number,
  },
  //爱心
  heart: {
    type: Number,
  },
})

// schema.virtual("children",{
//     localField:"_id",
//     foreignField:"labels",
//     justOne:false,
//     ref:'Lab'
// })
module.exports = mongoose.model('Blog', schema)
