const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/Users');
const menusRouter = require('./routes/Menus');

const db = require('./models');

const app = express();

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
app.use('/menus', menusRouter);

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
  console.log(err.stack);  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // set title variable
  // res.locals.title = 'Error';

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;