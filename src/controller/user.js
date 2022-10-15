/**
 * @decription 用户数据操作
 * @author 程序员小徐
 */

// 获取模型
const UserModel = require('../models/User')

// 定义新建用户的函数
/**
 * 注册函数
 * @param {string} username 
 * @param {string} password 
 * @returns 
 */
async function register(username,password){
    // 保存到数据库
    const newUser = await UserModel.create({username,password})
    return newUser
}
/**
 * 登录函数
 * @param {string} username 
 * @param {string} password 
 * @returns 
 */
async function login(username,password){
    const user = await UserModel.findOne({username,password})
    if(user!=null){
        return true
    }
    return false
}

// 导出函数
module.exports = {register,login}
