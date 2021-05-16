const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:String,
    psw:String
})
module.exports = mongoose.model('Login',schema)