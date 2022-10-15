//引入mongoose
const mongoose = require('mongoose');

//定义字符串常量
const db_url = "mongodb://localhost:27017" //本地默认端口
const db_name = 'fangjingdong-mall_koa2_project_db' //数据库名称

// 开始连接
mongoose.connect(`${db_url}/${db_name}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

// 连接对象
const db = mongoose.connection

// 监听错误
db.on('error',err=>{
    console.log('mongoose connect error',err)
})

// 连接成功
db.once('open',()=>{
    console.log('mongoose 连接成功')
})

// 输出mongoose
module.exports = mongoose;