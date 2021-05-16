const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    token: String,
    supNum: Number,
})
module.exports = mongoose.model('Mysup',schema)