<a name="KhNjU"></a>
## 1. 项目开发过程
- 一起评审需求，做接口设计
- 分离开发
- 前后端联调

![image.png](https://cdn.nlark.com/yuque/0/2022/png/27865087/1664720971232-4f252df0-de87-46c3-becd-e5325e698331.png#clientId=u5a048d5b-22ea-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=269&id=u441e4f6f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=403&originWidth=952&originalType=binary&ratio=1&rotation=0&showTitle=false&size=120982&status=done&style=none&taskId=ud32c5ad8-4bac-4eb5-a9aa-0f778aa048a&title=&width=634.6666666666666)
<a name="bjSor"></a>
## 2. 准备开发环境
<a name="LhLYc"></a>
### 2.1 初始化Koa环境
```javascript
// 1--全局安装koa-generator脚手架
npm install -g koa-generator

// 2--创建并初始化koa2项目
koa2 fangjingdong-mall_koa2_project

// 3--npm初始化
npm install

//4--注意，初始化koa2项目后要把package.json里面的
"dev": "./node_modules/.bin/nodemon bin/www",
  //改为
"dev": ".\\node_modules\\.bin\\nodemon bin\\www",

//5--在项目文件夹下新建src文件夹，并将public、routes、views、app.js移动到src文件夹里面，
//并更改bin文件夹下面www文件的var app = require('../app');更改为var app = require('../src/app');

//6--在src下面新建controller,models,db,middleware四个文件夹。至此，项目目录框架基本完成。
```
:::tips
koa-static是静态资源请求中间件，public文件夹为前端静态资源文件夹。打开http://localhost:3000/js/xxx.js 或http://localhost:3000/img/xxx.jpg (路径不能出现/public)，会在网页中显示相应的静态资源文件内容。<br />即app.js里面的app.use(require('koa-static')(__dirname + '/public'))
:::
<a name="F8Opj"></a>
### 2.2 登录功能，支持跨域
```javascript
//1--安装koa-generic-session
npm i koa-generic-session --save
```
```javascript
//2--使用koa-generic-session，在koa2项目的app.js
const session = require('koa-generic-session')
app.keys = ['session--koa2'] //秘钥--通过下面的这种方式生成的cookie是乱码的形式，即加密之后的，需要秘钥解密
// 自动配置了cookie和session
app.use(session({
  //配置cookie
  cookie:{
    path:'/', //cookie在根目录下有效 localhost:3000/
    httpOnly:true, //cookie只允许服务端来操作
    maxAge:24*60*60*1000 //cookie的过期时间
  }
}))
```
```javascript
//3--安装koa2-cors
npm i koa2-cors --save
```
```javascript
//4--解决跨域
// cors配置
app.use(cors({
  origin:'http://localhost:8080', //前端origin
  credentials:true //允许跨域带cookie
}))
```
<a name="PImre"></a>
### 2.3 安装mongoose，连接数据库
```javascript
//1--安装 mongoose
npm install mongoose
```
```javascript
//2--引用
var mongoose = require('mongoose');
```
```javascript
//3--创建js文件用于连接MongoDB数据库（在db文件夹下面创建db.js即可）

//引入mongoose
const mongoose = require('mongoose');

//定义字符串常量
const db_url = "mongodb://localhost:27017" //本地默认端口
const db_name = 'fangjingdong-mall_koa2_project_db' //数据库名称

// 开始连接
mongoose.connect(`${db_url}/${db_name}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

// 连接对象
const db = mongoose.connection

// 监听错误
db.on('error',err=>{
    console.log('mongoose connect error',err)
})

// 连接成功
db.once('open',()=>{
    console.log('mongoose 连接成功')
})

// 输出mongoose
module.exports = mongoose;
```
<a name="sqaaG"></a>
## 3. 需求和设计
<a name="wENaZ"></a>
### 3.1 需求分析

- 通过需求、原型图，看到服务端需要提供的能力
- 如服务端需要提供哪些接口，存储哪些数据
- 如服务端实现过程中，会遇到哪些问题，如何权衡
<a name="esrOI"></a>
### 3.2 接口设计
<a name="QKfot"></a>
#### 3.2.1 restful API
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27865087/1664781667885-87f256af-0ad6-4a9a-97a8-6eb700f5b6f4.png#clientId=ube6f3184-8bc1-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=140&id=u1468357d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=210&originWidth=679&originalType=binary&ratio=1&rotation=0&showTitle=false&size=41027&status=done&style=none&taskId=u112a7813-c67b-4c7f-8165-0f9b109cee4&title=&width=452.6666666666667)
<a name="QJqGP"></a>
#### 3.2.2 如何设计成一个资源？

- 尽量不用url参数

![image.png](https://cdn.nlark.com/yuque/0/2022/png/27865087/1664781781381-99fcb85d-8c47-429d-bf4b-ba4126710919.png#clientId=ube6f3184-8bc1-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=81&id=XkXyp&margin=%5Bobject%20Object%5D&name=image.png&originHeight=121&originWidth=567&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21518&status=done&style=none&taskId=u6356c511-88c4-4418-8a14-79c66043d3d&title=&width=378)

- 用method表示操作类型
   - 传统API设计：

![image.png](https://cdn.nlark.com/yuque/0/2022/png/27865087/1664781879202-dbc01316-ea42-4c2a-9adc-e9fe1ee9dfcf.png#clientId=ube6f3184-8bc1-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=133&id=u42c9d32c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=199&originWidth=577&originalType=binary&ratio=1&rotation=0&showTitle=false&size=32718&status=done&style=none&taskId=u1aec730a-e3e2-4522-8e29-139826441e3&title=&width=384.6666666666667)

   - Restful API设计：

![image.png](https://cdn.nlark.com/yuque/0/2022/png/27865087/1664781913409-90ef0692-710b-4f10-8a33-7856c0053cf2.png#clientId=ube6f3184-8bc1-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=149&id=u39ad792c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=223&originWidth=460&originalType=binary&ratio=1&rotation=0&showTitle=false&size=25982&status=done&style=none&taskId=u09159257-4836-4a00-a85d-4bea7771bbf&title=&width=306.6666666666667)
<a name="LRwye"></a>
### 3.3 登录技术方案

- 使用session做登录验证

![image.png](https://cdn.nlark.com/yuque/0/2022/png/27865087/1664900680824-c154b110-675b-49ec-b7af-051deb96d287.png#clientId=u48e3a803-4e06-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=260&id=ub26bf81e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=411&originWidth=756&originalType=binary&ratio=1&rotation=0&showTitle=false&size=96272&status=done&style=none&taskId=uf530c5fa-e2af-4ff3-89f1-444e3741a8a&title=&width=478)<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/27865087/1664900714831-1bc2c37d-9559-490e-a471-5448564a92ef.png#clientId=u48e3a803-4e06-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=236&id=u8adb47d6&margin=%5Bobject%20Object%5D&name=image.png&originHeight=429&originWidth=946&originalType=binary&ratio=1&rotation=0&showTitle=false&size=151997&status=done&style=none&taskId=u6b31fc69-0322-4a4d-9f24-96a8f797e7b&title=&width=519.3333740234375)

- 查看Koa2代码
```javascript
/**
 * @description 登录验证中间件
 * @author 程序员小徐
 */

module.exports = async (ctx,next)=>{
    const session = ctx.session //在app.js中已经配置了session，可以直接获取
    if(session && session.userInfo){
        await next()
        return
    }
    ctx.body = {
        error:-1,
        message:'登录验证失败'
    }
}
```
<a name="PPU67"></a>
### 3.4 数据模型设计
<a name="nBTPx"></a>
#### 3.4.1 抽象5类数据
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27865087/1664984155288-e2bf761f-4e1d-48e6-9a2f-329b61e44c2a.png#clientId=u2e6a6098-6773-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=304&id=u2dd891e2&margin=%5Bobject%20Object%5D&name=image.png&originHeight=456&originWidth=580&originalType=binary&ratio=1&rotation=0&showTitle=false&size=113901&status=done&style=none&taskId=ubd196304-1fad-4ccb-b609-27abaf5ddc6&title=&width=386.6666666666667)
<a name="uPBVL"></a>
#### 3.4.2 设计mongooe的Schema和Model

- 在src的models文件夹里面定义js文件：
```javascript
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
```
<a name="TrJBi"></a>
#### 3.4.3 模拟数据操作
```javascript
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
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27865087/1665073018154-76500a8f-4aeb-40a1-be79-31b805c5cf80.png#clientId=u6508668f-d45e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=217&id=u2d15d108&margin=%5Bobject%20Object%5D&name=image.png&originHeight=325&originWidth=1114&originalType=binary&ratio=1&rotation=0&showTitle=false&size=40816&status=done&style=none&taskId=ufe10195c-136d-48d1-8c34-b01b9778e40&title=&width=742.6666666666666)<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/27865087/1665073035637-16454eff-3674-4ae7-b6db-e472a7e3c523.png#clientId=u6508668f-d45e-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=165&id=u69614fbb&margin=%5Bobject%20Object%5D&name=image.png&originHeight=247&originWidth=1285&originalType=binary&ratio=1&rotation=0&showTitle=false&size=32882&status=done&style=none&taskId=ud8bf52a8-ffb3-4df2-85b2-86e9aa9a579&title=&width=856.6666666666666)
<a name="I2k2B"></a>
### 3.5 订单特殊性介绍
<a name="uydYX"></a>
#### 3.5.1 订单的特点

- 订单里包含了地址、商品信息、销售数量
- 订单里的信息是不可变的，而商品信息是可变的
- 所以，订单和商品、地址是复制关系，而非引用关系
<a name="pw3PQ"></a>
#### 3.5.2 订单model开发
```javascript
## 订单

```js
{
    username:'xxx', //就和用户产生关联

    _id:'xxx',
    shopId:'商店的 id',
    shopName:'商店的名称',
    isCanceled:true, //订单是否被取消
    
    // address和products 里面都不能写 _id:'xxx',因为是复制关系，不是引用关系，通过_id找到相关信息并复制下来即可
    address:{
        username:'xxx', //就和用户产生关联
        city:'北京',
        department:'xx小区',
        houseNumber:'门牌号',
        name:'张三',
        phone:'1293892130'
    },
    products:[{
        product:{
            shopId:'xxxxx', //对应商店的_id
            name:'番茄',
            sales:10,
            price:33.6,
            oldPrice:40.6,
            tabs:['all','seckill'] //左侧tab类型
        },
        orderSales:3
        },{
        product:{
            shopId:'xxxxx', //对应商店的_id
            name:'番茄',
            sales:10,
            price:33.6,
            oldPrice:40.6,
            tabs:['all','seckill'] //左侧tab类型
        },
        orderSales:3
        }
    ]
}
```
```
```javascript
/**
 * @decription 订单数据操作
 * @author 程序员小徐
 */

// 获取模型
const OrderModel = require('../models/Order')
const AddressModel = require('../models/Address')
const ProductModel = require('../models/Product')

/**
 * 创建订单
 * @param {String} username 用户名
 * @param {Object} data 订单数据
 * 订单信息=订单商品信息+地址信息，其中订单商品信息=商品信息+商品数量
 */
async function createOrder(username,data){
    // 1--先解构前端传过来的data
    const {
        addressId,
        shopId,
        shopName,
        isCanceled = false, //默认值
        products = [] //默认值
    } = data
    // 2--根据 addressId 获取地址信息
    const address = await AddressModel.findById(addressId)

    // 3--获取商品列表(因为前端传过来的data中，products信息只有id和数量两个元素)
    const pIds = products.map(p=>p.id) //解构出来的结果形式是 ['商品1id','商品2id']
    const productList = await ProductModel.find({
        shopId,
        _id:{$in:pIds}
    })
    // 4--将商品信息拼接上商品数量
    const productListWithSales = productList.map(p=>{
        // 商品id
        const id = p._id.toString()
        // 通过商品id可以找到销售数量（前端传过来的）
        const filterProducts = products.filter(item=>item.id===id)
        if(filterProducts.length===0){
            throw new Error('未找到匹配的销售数量')
        }
        return {
            product:p,
            orderSales:filterProducts[0].num
        }
    })
    // 5--创建订单，将订单商品信息与地址信息结合
    const newOrder = await OrderModel.create({
        username,
        shopId,
        shopName,
        address,
        isCanceled,
        products:productListWithSales
    })

    return newOrder
}

// 导出函数
module.exports = {createOrder}
```
<a name="OgIgl"></a>
## 4. 接口的开发
以注册接口为例：

- 首先要在src里面的controller文件夹user.js里面定义保存到数据库的函数：
```javascript
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

// 导出函数
module.exports = register
```

- 然后在src里面的routes文件夹users.js里面通过执行上述定义的函数实现注册：
```javascript
const router = require('koa-router')()
// 获取controller文件夹里面定义的新建用户函数
const register = require('../controller/user')
// 获取返回信息
const {SuccessModel,ErrorModel} = require('../res-model/index')

router.prefix('/api/user')

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

module.exports = router
```

- 在app.js里面注册相关路由：
```javascript
const users = require('./routes/users')
app.use(users.routes(), users.allowedMethods())
```
<a name="DulzD"></a>
## 5. 前后端联调
![image.png](https://cdn.nlark.com/yuque/0/2022/png/27865087/1665849585594-97cca31a-f1dd-41fc-b0c0-23c90a2a71e0.png#clientId=u209fbd64-3034-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=720&id=u0eec2242&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1080&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=295248&status=done&style=none&taskId=ue72589f2-34d0-43eb-b3b7-7bc5a0841a7&title=&width=1280)<br />联调的步骤：

- 测试主要的功能
- 看各个API返回，是否符合预期
- 看浏览器控制台有没有报错
