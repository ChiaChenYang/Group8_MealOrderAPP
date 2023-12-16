const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug')('meal-order-app:server');
const http = require('http');
const { Server } = require('socket.io');

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
const menusRouter = require('./routes/Menus');
const ordersRouter = require('./routes/Orders');
const shoppingCartsRouter = require('./routes/ShoppingCarts');

const db = require('./models');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {}
});

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
app.use(function(req, res, next){
  res.io = io;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/restaurants', restaurantsRouter);
app.use('/consumers', consumersRouter);
app.use('/menus', menusRouter);
app.use('/orders', ordersRouter);
app.use('/shopping', shoppingCartsRouter);

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

/*
// 捕捉 404 錯誤並轉發到錯誤處理中間件
app.use(async function(req, res, next) {
  console.log('Before 404 handler');

  try {
    // 嘗試執行下一個中間件或路由處理程序
    await next();

    // 如果執行完畢後仍未收到響應，則說明沒有匹配的路由
    console.log('No matching route found');
    next(createError(404)); // 創建 404 錯誤
  } catch (error) {
    // 捕捉異步錯誤，並輸出到控制台
    console.error('Error in middleware:', error.message);
    next(error);
  }
});
*/


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.error('Error:', err.message);
  /*res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');*/
  res.status(err.status || 500);
  res.json({ error: err.message });
});

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}