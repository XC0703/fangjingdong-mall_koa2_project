/**
 * @description Shop Model
 * @author 程序员小徐
 */

const mongoose = require('../db/db')

 // 1.定义ShopSchema的Schema
const ShopSchema = new mongoose.Schema({
    name:String,
    imgUrl:String,
    sales:Number,
    expressLimit:{
        type:Number,
        default:0
    },
    expressPrice:Number,
    slogan:String
},{ timestamps: true });

 // 2.将文档结构发布为模型
const ShopModel = mongoose.model('ShopModel',ShopSchema)

 // 3.输出模型
module.exports = ShopModel