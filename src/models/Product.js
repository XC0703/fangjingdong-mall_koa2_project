/**
 * @description Product Model
 * @author 程序员小徐
 */

const mongoose = require('../db/db')

 // 1.定义ProductSchema的Schema
const ProductSchema = new mongoose.Schema({
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
},{ timestamps: true });

 // 2.将文档结构发布为模型
const ProductModel = mongoose.model('ProductModel',ProductSchema)

 // 3.输出模型
module.exports = ProductModel