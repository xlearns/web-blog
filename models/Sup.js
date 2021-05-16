const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    //本站点赞次数
    Num:{
        type:String
    }

})
module.exports = mongoose.model('Sup',schema)