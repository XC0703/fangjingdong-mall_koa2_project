/**
 * @description Order Model
 * @author 程序员小徐
 */

const mongoose = require('../db/db')

 // 1.定义OrderSchema的Schema
const OrderSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true //必需
    },
    shopId:String,
    shopName:String,
    isCanceled:{
        type:Boolean,
        default:false,
    },
    address:{
        username:String,
        city:String,
        department:String,
        houseNumber:String,
        name:String,
        phone:String
    },
    products:[
        {
            product:{
                shopId:{
                    type:String,
                    require:true //必需
                },
                name:String,
                imgUrl:String,
                sales:Number,
                price:Number,
                oldPrice:Number,
                tabs:[String] //示例：tabs:['all','seckill']
            },
            orderSales:Number
        }
    ]
},{ timestamps: true });

 // 2.将文档结构发布为模型
const OrderModel = mongoose.model('OrderModel',OrderSchema)

 // 3.输出模型
module.exports = OrderModel