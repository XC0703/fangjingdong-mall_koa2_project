# API（接口）设计

## 注册

### url 

`/api/user/register`

### method 

`post`

### request body

````js
{
    username:'18378220978',
    password:`123abc`
}
````

### response body

````js
{
    error:0,
    message:`error !==0时的错误信息`
}
````


## 登录

### url 

`/api/user/login`

### method 

`post`

### request body

````js
{
    username:'18378220978',
    password:`123abc`
}
````

````js
{
    error:0,
    message:`error !==0时的错误信息`
}
````

------------------------

## 获取用户信息

### url 

`/api/user/info`

### method 

`get`

### request body

无

### response body

````js
{
    error:0,
    data:{
        username:'xxx'
    },
    message:'error !==0 错误信息'
}
````

## 创建收货地址

### url 

`/api/user/address`

### method 

`post`

### request body

````js
{
    city:'北京',
    deparement:'xx小区',
    houseNumber:'门牌号',
    name:'张三',
    phone:'129382913023'
}
````

### response body

````js
{
    error:0,
    data:{
        _id:'收获地址的 id',
        city:'北京',
        deparement:'xx小区',
        houseNumber:'门牌号',
        name:'张三',
        phone:'129382913023',
        createAt:Date,
        updateAt:Date
    },
    message:'error !==0 错误信息'
}
````

## 获取收货地址列表

### url 

`/api/user/address`

### method 

`get`

### request body

无

### response body

````js
{
    error:0,
    data:[
        {
            _id:'收获地址的 id',
            city:'北京',
            deparement:'xx小区',
            houseNumber:'门牌号',
            name:'张三',
            phone:'129382913023',
            createAt:Date,
            updateAt:Date
        },
        {

        }
    ],
    message:'error !==0 错误信息'
}
````

## 获取单个收获地址

### url 

`/api/user/address/:id` （`:id` 是一个动态参数，服务端可获取具体的参数值）

示例：`/api/user/address/100`

### method 

`get`

### request body

无

### response body

````js
{
    error:0,
    data:{
        _id:'收获地址的 id',
        city:'北京',
        deparement:'xx小区',
        houseNumber:'门牌号',
        name:'张三',
        phone:'129382913023',
        createAt:Date,
        updateAt:Date
    },
    message:'error !==0 错误信息'
}
````


## 更新收获地址

### url 

`/api/user/address/:id` （`:id` 是一个动态参数，服务端可获取具体的参数值）

示例：`/api/user/address/100`

### method 

`patch`

### request body

````js
{
    city:'北京',
    department:'xx小区',
    houseNumber:'门牌号',
    name:'张三',
    phone:'129382913023'
}
````

### response body

````js
{
    error:0,
    message:'error !==0 错误信息'
}
````

------------------------

## 附近（热门）店铺

### url 

`/api/shop/hot-list`

### method 

`get`

### request body

无

### response body

````js
{
    error:0,
    data:[
        {
            _id:'店铺 id',
            name:'沃尔玛',
            imgUrl:'商店的图片 url',
            sales:10000, //月售
            expressLimit:0, //起送价格
            expressPrice:5, //快滴价格
            slogan:'VIP 尊享满 89 元减 4 元运费券'
        },
        {

        }
    ],
    message:'error !==0 错误信息'
}
````

## 商店详情

### url 

`/api/shop/:id`

### method 

`/get`

### request body

无

### response body

````js
{
    error:0,
    data:{
        _id:'店铺 id',
        name:'沃尔玛',
        imgUrl:'商店的图片 url',
        sales:10000, //月售
        expressLimit:0, //起送价格
        expressPrice:5, //快滴价格
        slogan:'VIP 尊享满 89 元减 4 元运费券'
    },
    message:'error !==0 错误信息'
}
````

## 查询（某个）商店的商品列表

### url 

`/api/shop/:id/products`

### query

`tab=全部商品`

举例`/api/shop/10/products?tab=秒杀`

### method 

`get`

### request body

无

### response body

````js
{
    error:0,
    data:[
        {
            _id:'商品 id',
            name:'番茄 250g/份',
            imgUrl:'xxx.png',
            sales:10,
            price:33.6,
            oldPrice:40.6
        },
        {

        }
    ],
    message:'error !==0 错误信息'
}
````

------------------------

## 创建订单

### url 

`/api/order`

### method 

`post`

### request body

````js
{
    addressId:'收获地址的 id',
    shopId:'商店的 id',
    shopName:'商店的名称',
    isCanceled:true, //订单是否被取消
    products:[
        {
            id:'商品 id',
            num:3 //购买数量
        },
        {

        }
    ]
}
````

### response body

````js
{
    error:0,
    data:{
        _id:'订单 id'
    },
    message:'error !==0 错误信息'
}
````



------------------------

## 标题

### url 

### method 

### request body

````js
{
}
````

### response body

````js
{
}
````