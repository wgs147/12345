var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var sessionParser = require('express-session')
var mongoStore = require('connect-mongo')(sessionParser)
var bodyParser = require('body-parser');

var indexs = require('./routes/index');
var routes = require('./routes/routes');

// 链接数据库
require('./db');

var app = express(); 

//设置存储当前正在执行的脚本所在的目录
app.set('views', path.join(__dirname, 'views'));
// 设置视图模板引擎为jade
app.set('view engine', 'jade');

app.use(logger('dev')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser()); 


app.use(sessionParser({
	secret: '12345', // 128 个字符的随机字符串
  name: 'userInfo',
  cookie: { maxAge: 3600000 },
  resave:true,
  rolling:true,
  saveUninitialized:false
}));

app.use(function (req,res,next) {
  var _userName = req.session.userName;
  app.locals.userName = _userName;
  return next();
})

// __dirname文件的绝对路径 设置public文件夹为存放静态文件的目录
app.use(express.static(path.join(__dirname, 'public'))); 



// 路由控制器

indexs(app);
routes(app);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler 
app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app; 
