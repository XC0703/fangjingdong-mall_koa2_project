/**
 * @description User Model
 * @author 程序员小徐
 */

const mongoose = require('../db/db')

// 1.定义UserSchema的Schema
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true, //必需
        unique:true //唯一，不可重复
    },
    password:{
        type:String,
        require:true, //必需
        unique:true //唯一，不可重复
    }
},{ timestamps: true });

// 2.将文档结构发布为模型
const UserModel = mongoose.model('UserModel',UserSchema)

// 3.输出模型
module.exports = UserModel