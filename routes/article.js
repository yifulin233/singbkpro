var express = require('express')
var router = express.Router()



//将用户模板导入
let Article = require('../models/article')


// 上传文件工具Multiparty导入
var Multiparty = require('multiparty')
// 导入文件
let fs = require('fs')

// 添加博客接口
router.post('/add', (req, res, next) => {

    console.log(req.body);
    //向数据库添加用户信息
    let articleInfo = {
        title: req.body.title,
        content: req.body.content,
        username: req.session.username,
        id: Date.now()
    }

    //页面表单数据，放入模型
    let articleI = new Article(articleInfo)


    //保存
    articleI.save((err, result) => {
        if (!err) {
            res.send(result)
        }
    })
});



// 新增上传图片的路由
router.post('/upload', (req, res, next) => {
    // 图片文件上传的操作
    console.log(req.body);
    let form = new Multiparty.Form()
    // 使用path，获取文件信息
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
        }
        let file = files.upload[0]
        // console.log(file);
        // 将读取到的文件信息，及文件上传到本项目下，也就是服务器
        // 读取文件流
        let rStream = fs.createReadStream(file.path)
        // 拼接路径
        let filePath = '/uploads/' + file.originalFilename
        // 写入文件流
        let wStream = fs.createWriteStream('./public' + filePath)
        // 触发读写管道，实现上传
        rStream.pipe(wStream)
        // 将文件返回给ckeditor这个插件
        wStream.on('close', () => {
            res.send({ uploaded: 1, url: filePath })//将服务器端图片地址拿给文本框，使得文章能正确加载插图



        })


    })












})












module.exports = router