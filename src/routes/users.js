const router = require('koa-router')()
// 获取controller文件夹里面定义的新建用户函数、登录函数
const {register,login} = require('../controller/user')
// 获取返回信息
const {SuccessModel,ErrorModel} = require('../res-model/index')

router.prefix('/api/user')
// 注册
router.post('/register',async function(ctx,next){
  // 从前端拿到注册的账号与密码
  const {username,password} = ctx.request.body
  // 用try与catch的原因是创建新用户的性能消耗较大，可能易发生错误
  try{
    // 新建用户到数据库,函数实现在controller文件夹里面
    const newUser = await register(username,password)
    // 返回给前端
    // ctx.body={
    //   errno:0,
    //   data:newUser //多返回一个信息，防止前端需求有变动再来找后端修改代码
    // }
    ctx.body = new SuccessModel(newUser)
  }catch(ex){
    console.error(ex)
    // ctx.body = {
    //   errno:10001,
    //   message:`注册失败 - ${ex.message}`,
    // }
    ctx.body = new ErrorModel(10001,`注册失败 - ${ex.message}`)
  }
})
// 登录
router.post('/login',async function(ctx,next){
  // 从前端拿到注册的账号与密码
  const {username,password} = ctx.request.body
  // 查询单个用户
  const res = await login(username,password)
  if(res){
    // 登录成功
    ctx.session.userInfo = {username} //设置session,cookie也种上了
    ctx.body = new SuccessModel()
  }else{
    // 登录失败
    ctx.body = new ErrorModel(10002,`登录验证失败`)
  }
})

module.exports = router
