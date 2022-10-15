const router = require('koa-router')()
// 获取返回信息
const {SuccessModel,ErrorModel} = require('../res-model/index')
// 引入controller里面定义的函数
const { getHotList,getShopInfo,getProductsByShopId } = require('../controller/shop')


router.prefix('/api/shop')

// 商店列表--不用登录验证，也可以看到商店
router.get('/hot-list',async function(ctx,next){
    // 获取列表
    const list = await getHotList()
    ctx.body = new SuccessModel(list)
})


// 单个商店信息
router.get('/:id',async function(ctx,next){
    const id = ctx.params.id
    const shop = await getShopInfo(id)
    ctx.body = new SuccessModel(shop)
})

// 获取商店的商品
router.get('/:id/products',async function(ctx,next){
    const shopId = ctx.params.id
    const tab = ctx.query.tab || 'all' //query里的默认参数为'all'

    const products = await getProductsByShopId(shopId,tab)
    ctx.body = new SuccessModel(products)
})

module.exports = router