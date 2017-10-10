var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
//CJD
var menu = require('./routes/menu');
var page = require('./routes/page');
var service = require('./routes/service');
var news = require('./routes/news');
var news1 = require('./routes/news1');
var news2 = require('./routes/news2');
var serone = require('./routes/serone');
var seroneimg = require('./routes/seroneimg');
var seroneimg1 = require('./routes/seroneimg1');
var sertwo = require('./routes/sertwo');
var serthree = require('./routes/serthree');
var serthreeimg = require('./routes/serthreeimg');
var serthreeimg1 = require('./routes/serthreeimg1');
var serfour = require('./routes/serfour');
var serfourbottom = require('./routes/serfourbottom');
var teamimg = require('./routes/teamimg');
var teamimg1 = require('./routes/teamimg1');
//LY
var menu = require('./routes/menu');					//顶部导航
var HomeFooter = require('./routes/Home_footer');		//底部公司信息
var ImgSUpload = require('./routes/imgs');     		 //后台修改轮播图
var HomeBanner = require('./routes/HomeBanner');      //首页轮播图部分
var Recom = require('./routes/Recommond');      //热销推荐

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
//CJD
app.use('/menu', menu);
app.use('/page', page);
app.use('/service',service);
app.use('/news',news);
app.use('/news1',news1);
app.use('/news2',news2);
app.use('/serone',serone);
app.use('/seroneimg',seroneimg);
app.use('/seroneimg1',seroneimg1);
app.use('/sertwo',sertwo);
app.use('/serthree',serthree);
app.use('/serthreeimg',serthreeimg);
app.use('/serthreeimg1',serthreeimg1);
app.use('/serfour',serfour);
app.use('/serfourbottom',serfourbottom);
app.use('/teamimg',teamimg);
app.use('/teamimg1',teamimg1);
// LY
app.use('/menu', menu);       //首页__导航
app.use('/ZoeFooter',HomeFooter);	//首页__底部
app.use('/imgs', ImgSUpload);		//
app.use('/HB', HomeBanner);  		//首页轮播图
app.use('/RC', Recom);  		//热销推荐




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.listen("8000",function () {
//     console.log('');
// });

module.exports = app;
