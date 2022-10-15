/**
 * @decription 商店数据操作
 * @author 程序员小徐
 */

// 获取模型
const ShopModel = require('../../models/Shop')
// 定义async的立即执行函数
!(async()=>{
    // 创建两个商店
    // await ShopModel.create({
    //     name:'沃尔玛', 
    //     imgUrl:'/images/shop/wmt.jepg',
    //     sales:10000,
    //     expressLimit:0,
    //     expressPrice:5,
    //     slogan:'VIP尊享满89元减4元运费券'
    // })

    // await ShopModel.create({
    //     name:'山姆会员商店', 
    //     imgUrl:'/images/shop/sam.jepg',
    //     sales:2000,
    //     expressLimit:0,
    //     expressPrice:5,
    //     slogan:'联合利华洗护满10减5'
    // })

    // 获取附近商店，根据id逆序
    const shopList = await ShopModel.find().sort({_id:-1})
    console.log('shopList',shopList)

})()
