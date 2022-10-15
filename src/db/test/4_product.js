/**
 * @description 商品数据操作
 * @author 程序员小徐
 */

// 获取模型
const ProductModel = require('../../models/Product')
// 定义async的立即执行函数
!(async () => {
    //  // 创建几个商品
    // await ProductModel.create({
    //     shopId: '634045411aba53cd21ae67e6', // 沃尔玛
    //     name: '葡萄',
    //     imgUrl: '/images/product/grape.jpg',
    //     sales: 100, // 月售多少
    //     price: 33, // 当前价格
    //     oldPrice: 36, // 原价
    //     tabs: ['all', 'seckill', 'fruit']
    // })

    // await ProductModel.create({
    //     shopId: '634045411aba53cd21ae67e6', // 沃尔玛
    //     name: '苹果',
    //     imgUrl: '/images/product/apple.jpeg',
    //     sales: 200, // 月售多少
    //     price: 25, // 当前价格
    //     oldPrice: 27, // 原价
    //     tabs: ['all', 'seckill', 'fruit']
    // })

    // await ProductModel.create({
    //     shopId: '634045411aba53cd21ae67e6', // 沃尔玛
    //     name: '桃子',
    //     imgUrl: '/images/product/peach.jpg',
    //     sales: 50, // 月售多少
    //     price: 16, // 当前价格
    //     oldPrice: 19, // 原价
    //     tabs: ['all', 'seckill', 'fruit']
    // })

    // await ProductModel.create({
    //     shopId: '634045411aba53cd21ae67e9', // 山姆会员店
    //     name: '西瓜',
    //     imgUrl: '/images/product/watermelon.jpg',
    //     sales: 180, // 月售多少
    //     price: 13, // 当前价格
    //     oldPrice: 15, // 原价
    //     tabs: ['all', 'seckill', 'fruit']
    // })

     // 获取商品列表，根据 shopId
    const pList = await ProductModel.find({
        shopId: '634045411aba53cd21ae67e6',
        tabs: {
            $in: 'all' // 匹配 tabs
        }
    })
    console.log('ProductModel list', pList)
})()
