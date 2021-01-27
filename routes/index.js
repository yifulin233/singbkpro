var express = require('express');
var router = express.Router();

// 文章模板导入
let Article = require('../models/article')

let moment = require('moment')


/* GET home page. */
router.get('/', async function (req, res, next) {
  let cPage = req.query.page || 1
  // console.log(cPage);
  // let data = await Article.find()
  // console.log(data);
  let userName = req.session.username || ''

  let data = {
    blogList: [],//文章列表
    currPage: cPage,//当前页数
    PagesTotle: '',//总页数
  }

  // 设定每页渲染的条数
  let pageSize = 4
  // 确定每页显示的数据
  data.blogList = await Article.find()
    .limit(pageSize)//限定展示出来的条数
    .skip((data.currPage - 1) * pageSize)//限定从第几条开始截取
  // 总数据
  let blogAll = await Article.find()
  // 总页码
  data.PagesTotle = Math.ceil(blogAll.length / pageSize)
  // console.log(data.PagesTotle);
  // 将所有的时间戳转换成时间
  data.blogList.map(item => {
    // let a = moment(item.id).format('MMM Do YYYY')
    // let a = moment(item.id).format('LLLL');
    let a = moment(item.id).format('MMMM Do YYYY, h:mm:ss a');
    item['time'] = a
  })

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
