const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    //用户名
    username:{
        type:String
    },
    //密码
    password:{
        type:String,
        //=>select:false 表示"查询"的时候不查询select下面的数据
        select:false,
        //=>set:自定义修改然后再保存到数据库内
        set:function(val){
            //hashSync(加密的值,加密的等级一般10~12比较好一点) 散列是个同步的方法
            return require("bcrypt").hashSync(val,10)
        }
    }
})
module.exports = mongoose.model('AdminUser',schema)