var express = require('express');
var router = express.Router();

//将用户模板导入
let User = require('../models/user')


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//实现用户提交信息，注册事项
// Response   响应
// Request    请求
router.post('/addUser', async (req, res, next) => {



  //向数据库添加用户信息
  let userInfo = {
    userName: req.body.userName,
    password: req.body.password,
    passwordC: req.body.passwordC,
  }




  // const schema = Joi.object({
  //   userName: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
  //   password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
  //   passwordC: Joi.ref('password')
  // })
  // try {
  //   const value = await schema.validateAsync(userInfo)
  // } catch (err) {
  //   console.log(err.message);
  // }




  //用户验证
  //处理验证的最佳时期
  // joi验证

  // 2.定义规则
  // let joiSchema = Joi.object({
  //   userName: Joi.string(),
  //   password: Joi.string(),
  //   passwordC: Joi.ref('password'),
  // })

  // // 3.验证数据
  // let message = joiSchema.validate(userInfo)
  // console.log(message.value);
  // // 响应结果
  // res.render('error_alert', { message })



  //页面表单数据，放入模型
  let userI = new User(userInfo)

  //保存
  userI.save((err, result) => {
    if (!err) {
      res.send(result)
    }
  })

});

// 登录——————查询
router.post('/login', (req, res, next) => {
  // 从表单获取数据
  let userInfo = {
    userName: req.body.username,
    password: req.body.password
  }

  // console.log(userInfo);

  User.findOne(userInfo, function (err, result) {
    // 错误处理
    if (err) {
      return console.log(err);
    } if (result == null) {
      console.log('登录失败');
      res.redirect('/regist')
    } else {
      // 将用户登录信息存储
      req.session.username = userInfo.userName



      console.log('登陆成功');
      // 路由重定向
      res.redirect('/')
    }



  })
  // 查询到————登陆成功————跳转到首页
  // 查询不到，重定向到注册页面，去测



})








module.exports = router;
