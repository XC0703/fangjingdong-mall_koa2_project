const router = require('koa-router')()
// 获取返回信息
const {SuccessModel,ErrorModel} = require('../res-model/index')
// 要登录校验
const loginCheck = require('../middleware/loginCheck')
// 引入controller里面定义的函数
const {createAddress,getAddressList,getAddressById,updateAddress} = require('../controller/address')

router.prefix('/api/user/address')

// 创建收货地址——使用登录验证中间件，携带cookie
router.post('/',loginCheck,async function(ctx,next){
    // 前端传过来的request.body没有username这个属性，但是由于已经进行了登录验证，可以从session中获取
    const userInfo = ctx.session.userInfo
    const username = userInfo.username
    const data = ctx.request.body

    try{
        const newAddress = await createAddress(username,data)
        ctx.body = new SuccessModel(newAddress)
    }catch(ex){
        console.error(ex)
        ctx.body = new ErrorModel(10004,`创建收获地址失败 - ${ex.message}`)
    }
})

// 获取收货地址列表(通过username获取)
router.get('/',loginCheck,async function(ctx,next){
    const userInfo = ctx.session.userInfo
    const username = userInfo.username

    const addressList = await getAddressList(username)
    ctx.body = new SuccessModel(addressList)

})

// 获取单个收获地址
router.get('/:id',loginCheck,async function(ctx,next){
    const id = ctx.params.id

    const address = await getAddressById(id)
    ctx.body = new SuccessModel(address)
})

// 更新收获地址
router.patch('/:id',loginCheck,async function(ctx,next){
    const id = ctx.params.id
    const data = ctx.request.body
    const userInfo = ctx.session.userInfo
    const username = userInfo.username

    // 更新
    try{
        const newAddress = await updateAddress(id,username,data)
        ctx.body = new SuccessModel(newAddress)
    }catch(ex){
        console.error(ex)
        ctx.body = new ErrorModel(10005,`更新收获地址失败 - ${ex.message}`)
    }

})

module.exports = router