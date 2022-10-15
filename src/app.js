const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const cors = require('koa2-cors')

const index = require('./routes/index')
const users = require('./routes/users')
const addresRouter = require('./routes/address')
const shopRouter = require('./routes/shop')
const orderRouter = require('./routes/order')

// error handler
onerror(app)

// cors配置
app.use(cors({
  origin:'http://localhost:8080', //前端origin
  credentials:true //允许跨域带cookie
}))

// session配置
app.keys = ['session--koa2'] //秘钥--通过下面的这种方式生成的cookie是乱码的形式，即加密之后的，需要秘钥解密
// 自动配置了cookie和session
app.use(session({
  //配置cookie
  cookie:{
    path:'/', //cookie在根目录下有效 localhost:3000/
    httpOnly:true, //cookie只允许服务端来操作
    maxAge:24*60*60*1000 //cookie的过期时间
  }
}))

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(addresRouter.routes(), addresRouter.allowedMethods())
app.use(shopRouter.routes(), shopRouter.allowedMethods())
app.use(orderRouter.routes(), orderRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
