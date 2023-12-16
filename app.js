var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 設定 prometheus 監控告警
const promClient = require('prom-client')
// 創建一個 Prometheus Registry
// const promRegistry = new promClient.Registry();
// Enable the collection of default metrics
promClient.collectDefaultMetrics()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/Users');
var restaurantsRouter = require('./routes/Restaurants');
var consumersRouter = require('./routes/Consumers');

const db = require('./models');

const app = express();
app.use(express.json({ limit: '50mb' }));  // 設置請求體大小限制為 50MB

db.sequelize.sync({ alter: false });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/restaurants', restaurantsRouter);
app.use('/consumers', consumersRouter)

// 設定 Prometheus 指標端點
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);

  try {
    const metrics = await promClient.register.metrics(); // 等待 Promise 解析完成
    res.end(metrics);
  } catch (err) {
    console.error('Error while processing /metrics:', err);
    res.status(500).end(); // 回傳 500 錯誤
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.error('Error:', err.message);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
