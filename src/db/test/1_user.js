/**
 * @decription 用户数据操作
 * @author 程序员小徐
 */

// 获取模型
const UserModel = require('../../models/User')
// 定义async的立即执行函数
!(async()=>{
    // // 注册：创建一个新的用户
    // await UserModel.create({
    //     username:'zhangsan',
    //     password:'123'
    // })

    // // 再创建一个用户
    // await UserModel.create({
    //     username:'18343254354',
    //     password:'456'
    // })

    // 登录：查询单个用户
    const zhangsan = await UserModel.findOne({
        username:'zhangsan',
        password:'123'
    })
    console.log('zhangsan',zhangsan)

})()
