/**
 * @decription 商店数据操作
 * @author 程序员小徐
 */

// 获取模型
const ShopModel = require('../models/Shop')
const ProductModel = require('../models/Product')

/**
 * 创建商店列表（热门商店）
 */
async function getHotList(){
    const list = await ShopModel.find().sort({_id:-1})
    return list
}

/**
 * 获取商店信息
 * @param {string} id 
 */
async function getShopInfo(id){
    const shop = await ShopModel.findById(id)
    return shop
}

/**
 * 根据商店获取商品
 * @param {string} shopId 商品 id
 * @param {string} tab tab 分类
 */
async function getProductsByShopId(shopId,tab='all'){
    const list = await ProductModel.find({
        shopId,
        tabs:{
            $in:tab
        }
    }).sort({_id:-1})
    return list
}

// 导出函数
module.exports = {getHotList,getShopInfo,getProductsByShopId}
