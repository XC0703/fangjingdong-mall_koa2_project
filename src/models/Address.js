/**
 * @description Address Model
 * @author 程序员小徐
 */

const mongoose = require('../db/db')

 // 1.定义AddressSchema的Schema
const AddressSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true, //必需
    },
    city:String,
    department:String,
    houseNumber:String,
    name:String,
    phone:String
},{ timestamps: true });

 // 2.将文档结构发布为模型
const AddressModel = mongoose.model('AddressModel',AddressSchema)

 // 3.输出模型
module.exports = AddressModel