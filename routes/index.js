var express = require('express');
var router = express.Router();

// 文章模板导入
let Article = require('../models/article')



/* GET home page. */
router.get('/', async function (req, res, next) {
  let data = await Article.find()
  console.log(data);
  let userName = req.session.username || ''
  res.render('index', { userName, data });
});

//login路由配置
router.get('/login', function (req, res) {
  res.render('login', {});
});

//dateils详情页路由配置
router.get('/details', function (req, res) {
  let userName = req.session.userName || ''
  res.render('details', { userName });
});


//write路由配置
router.get('/write', function (req, res) {
  let userName = req.session.userName || ''
  res.render('write', { userName });
});

//regist路由配置
router.get('/regist', function (req, res) {
  res.render('regist', {});
});



module.exports = router;
