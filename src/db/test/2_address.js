/**
 * @decription 地址数据操作
 * @author 程序员小徐
 */

// 获取模型
const AddressModel = require('../../models/Address')
// 定义async的立即执行函数
!(async()=>{
    // // 创建收货地址
    // await AddressModel.create({
    //     username:'zhangsan', //和用户关联起来
    //     city:'四川省成都市',
    //     department:'xxx小区',
    //     houseNumber:'门牌号1',
    //     name:'张三',
    //     phone:'12342353543'
    // })

    // // 再创建收货地址
    // await AddressModel.create({
    //     username:'zhangsan', //和用户关联起来
    //     city:'广西玉林市',
    //     department:'xxx村',
    //     houseNumber:'门牌号2',
    //     name:'李四',
    //     phone:'18942353543'
    // })

    // // 删除单个收获地址
    // const zhangsan = await AddressModel.deleteOne({
    //     username:'zhangsan',
    // })

    // // 获取收获地址列表
    // const addressList = await AddressModel.find({
    //     username:'zhangsan',
    // })
    // console.log('addressList',addressList)

    // 更新收获地址
    //找到更新的数据
    let where_str = { '_id' : '634040b1aac0dbdcbb3e1a8f'};
    //更新后的数据
    let update_str = { 'username' : 'lisi'}; 
    await AddressModel.updateOne(where_str,update_str)

})()
