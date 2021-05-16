const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    //标题
    title:{
        type:String
    },
    //关联Category的id
    categories:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Category"
    }],
    //内容
    body:{
        type:String
    }
},{
    timestamps: true
})
module.exports = mongoose.model('Article',schema)