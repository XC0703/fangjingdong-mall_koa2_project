/**
 * @description 登录验证中间件
 * @author 程序员小徐
 */
// 获取返回信息
const {ErrorModel} = require('../res-model/index')

module.exports = async (ctx,next)=>{
    const session = ctx.session //在app.js中已经配置了session，可以直接获取
    if(session && session.userInfo){
        await next()
        return
    }
    ctx.body = new ErrorModel(10003,'登录验证失败')
    // ctx.body = {
    //     error:-1,
    //     message:'登录验证失败'
    // }
}