/**
 * @decription 订单数据操作
 * @author 程序员小徐
 */

// 获取模型
const OrderModel = require('../models/Order')
const AddressModel = require('../models/Address')
const ProductModel = require('../models/Product')

/**
 * 创建订单
 * @param {String} username 用户名
 * @param {Object} data 订单数据
 * 订单信息=订单商品信息+地址信息，其中订单商品信息=商品信息+商品数量
 */
async function createOrder(username,data){
    // 1--先解构前端传过来的data
    const {
        addressId,
        shopId,
        shopName,
        isCanceled = false, //默认值
        products = [] //默认值
    } = data
    // 2--根据 addressId 获取地址信息
    const address = await AddressModel.findById(addressId)

    // 3--获取商品列表(因为前端传过来的data中，products信息只有id和数量两个元素)
    const pIds = products.map(p=>p.id) //解构出来的结果形式是 ['商品1id','商品2id']
    const productList = await ProductModel.find({
        shopId,
        _id:{$in:pIds}
    })
    // 4--将商品信息拼接上商品数量
    const productListWithSales = productList.map(p=>{
        // 商品id
        const id = p._id.toString()
        // 通过商品id可以找到销售数量（前端传过来的）
        const filterProducts = products.filter(item=>item.id===id)
        if(filterProducts.length===0){
            throw new Error('未找到匹配的销售数量')
        }
        return {
            product:p,
            orderSales:filterProducts[0].num
        }
    })
    // 5--创建订单，将订单商品信息与地址信息结合
    const newOrder = await OrderModel.create({
        username,
        shopId,
        shopName,
        address,
        isCanceled,
        products:productListWithSales
    })

    return newOrder
}

// 导出函数
module.exports = {createOrder}
