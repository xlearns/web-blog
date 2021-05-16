const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  msg:{
    type:String
  },
  name:{
    type:String
  },
  sup:{
    type:Number
  },
  time:{
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('Msg',schema)