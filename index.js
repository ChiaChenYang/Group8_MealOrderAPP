const express = require('express');
const app = express();
app.use(express.json());
const db = require('./models');
const updateDatabase = require('./services/ee');
// Routers
/*
這段程式碼是將來自 ./routes/Posts 檔案中定義的路由與應用程式中的 /posts 路徑相關的所有請求關聯起來。
當有來自 /posts 的 HTTP 請求時，Express 應用程式將使用 postRouter 中定義的處理邏輯來回應這些請求。
*/ 
// const postRouter = require('./routes/Posts');
// app.use('/posts', postRouter);

/*
Node.js 中使用 Express 框架建立一個伺服器，並讓該伺服器在 3001 連接埠啟動。
當這個伺服器被啟動後，會在控制台（Console）打印出 'Server is running on port 3001!'
這個訊息，告訴你伺服器已經成功啟動並正在監聽 3001 連接埠。
*/
// db.sequelize.sync().then(() => {
//     app.listen(3001, () => {
//         console.log('Server is running on port 3001.');
//     });
// });

db.sequelize.sync({ force: true }).then(async () => {
    // await updateDatabase();


    const postRouter = require('./routes/Posts');
    app.use('/posts', postRouter);

    app.listen(3001, () => {
        console.log('Server is running on port 3001.');
    });
}).catch((err) => {
    console.log(err);
});

// 透過安裝 nodemon 套件，就可以每次有程式碼變更後，都可以隨時啟用，不用下 npm xxx.js 這樣的指令

// import table

