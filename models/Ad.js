const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    //标题
    name:{
        type:String
    },
    //内容
    items:[
        {
           image:{type:String},
           url:{type:String} 
        }
    ]
})
module.exports = mongoose.model('Ad',schema)