/**
 * @description 订单数据操作
 * @author 程序员小徐
 */

// 获取模型
const OrderModel = require('../../models/Order')
const AddressModel = require('../../models/Address')
const ProductModel = require('../../models/Product')
// 定义async的立即执行函数
!(async () => {
    // 创建订单
    const requestBody = {
        addressId:'63403f88a1bfa39edb57b8ed',
        shopId:'634045411aba53cd21ae67e6',
        shopName:'沃尔玛',
        isCanceled:false, //订单是否被取消
        products:[
            {
                id:'634048f0113d3b5f0aded9da',
                num:3 //购买数量
            },
            {
                id:'634048f0113d3b5f0aded9dd',
                num:5 //购买数量
            }
        ]
    }
    // 获取addres
    const address = await AddressModel.findById(requestBody.addressId)
    // 获取商品列表
    const pIds = requestBody.products.map(p=>p.id) //得到商品id的数组
    const productList = await ProductModel.find({
        shopId:requestBody.shopId,
        // 表示_id需要在上述id数组中
        _id:{
            $in:pIds
        }
    })
    // console.log(pIds)
    // console.log(productList)

    // 整合订单购买数量
    const productListWithSales = productList.map(p=>{ //得到订单商品的数组
        // 找到商品id
        const id = p._id.toString()

        // 通过商品id找到商品的购买数量，因为在requestBody中它们一一对应
        const filterProducts = requestBody.products.filter(
            item=>item.id===id //筛选出requestBody商品中的商品id等于当前商品id的商品
            )
            if(filterProducts.length===0){
                throw Error('未找到匹配的销量数据')
            }

            return {
                product:p,
                orderSales:filterProducts[0].num
            }
    })
    // console.log(productListWithSales)

    // 创建订单
    await OrderModel.create({
        username:'zhangsan',
        shopId:requestBody.shopId,
        shopName:requestBody.shopName,
        isCanceled:requestBody.isCanceled,
        address,
        products:productListWithSales
    })
    // await OrderModel.deleteMany({"shopName":'山姆会员商店'})
})()
