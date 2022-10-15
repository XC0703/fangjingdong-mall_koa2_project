const router = require('koa-router')()
// 获取返回信息
const {SuccessModel,ErrorModel} = require('../res-model/index')
// 要登录校验
const loginCheck = require('../middleware/loginCheck')
// 引入controller里面定义的函数
const {createOrder} = require('../controller/order')

router.prefix('/api/order')

// 创建订单——使用登录验证中间件，携带cookie
router.post('/',loginCheck,async function(ctx,next){
    // 前端传过来的request.body没有username这个属性，但是由于已经进行了登录验证，可以从session中获取
    const userInfo = ctx.session.userInfo
    const username = userInfo.username

    // 获取订单数据
    const data = ctx.request.body

    // 创建订单
    try{
        const newOrder = await createOrder(username,data)
        ctx.body = new SuccessModel(newOrder)
    }catch(ex){
        console.error(ex)
        ctx.body = new ErrorModel(10004,`创建订单失败 - ${ex.message}`)
    }
})

// 获取订单列表

module.exports = router