/**
 * @decription 地址数据操作
 * @author 程序员小徐
 */

// 获取模型
const AddressModel = require('../models/Address')

/**
 * 创建收货地址
 * @param {string} username 用户名
 * @param {*Object} data 地址的详细信息
 * @returns 
 */
async function createAddress(username,data){
    // 保存到数据库
    const newAddress = await AddressModel.create({
        username,
        ...data
    })
    return newAddress
}

/**
 * 获取收货地址列表
 * @param {string} username 用户名
 */
async function getAddressList(username){
    const addressList = await AddressModel.find({username}).sort({updatedAt:-1})
    return addressList
}

/**
 * 获取单个收获地址
 * @param {string} id id
 */
async function getAddressById(id){
    const address = await AddressModel.findById(id)
    return address
}

/**
 * 
 * @param {string} id id
 * @param {string} username 用户名
 * @param {Object} data 地址的详细信息
 * @returns 
 */
async function updateAddress(id,username,data={}){
    const address = await AddressModel.findOneAndUpdate(
        { _id:id,username}, //查询条件
        { username,...data}, //更新之后的数据
        { new: true}
    )
    return address
}

// 导出函数
module.exports = {createAddress,getAddressList,getAddressById,updateAddress}
