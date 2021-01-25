var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  let userName = req.session.username || ''

  res.render('index', { userName });
});

//login路由配置
router.get('/login', function (req, res) {
  res.render('login', {});
});

//dateils详情页路由配置
router.get('/details', function (req, res) {
  res.render('details', {});
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
