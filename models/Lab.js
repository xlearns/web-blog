const mongoose = require('mongoose')
const schema = new mongoose.Schema({
   url:{type:String}, 
   description:{type:String}, 
})
module.exports = mongoose.model('Lab',schema)