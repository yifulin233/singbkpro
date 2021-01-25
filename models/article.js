let mongoose = require('../mongodb/db')
//Schema
let Schema = mongoose.Schema

let articleSchema = new Schema({
    title: String,
    content: String
})

//Model--------将会生成数据库集合名（复数）
let Article = mongoose.model('articles', articleSchema)



module.exports = Article