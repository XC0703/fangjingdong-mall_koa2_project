# 数据模型设计

列举各个数据模型的示例，写明属性

## 用户

```js
{
    _id:'xxx',
    username:'xxx', //唯一
    password:'123'
}
```

## 地址

```js
{
    _id:'xxx',
    username:'xxx', //就和用户产生关联
    city:'北京',
    department:'xx小区',
    houseNumber:'门牌号',
    name:'张三',
    phone:'1293892130'
}
```

## 商店

```js
{
    _id:'xxx',
    name:'沃尔玛',
    imgUrl:'xxx.png',
    sales:10000,
    expressLimit:0,
    expressPrice:5,
    slogan:'红色的宣传语'
}
```

## 商品

```js
{
    _id:'xxx',
    shopId:'xxxxx', //对应商店的_id
    name:'番茄',
    sales:10,
    price:33.6,
    oldPrice:40.6,
    tabs:['all','seckill'] //左侧tab类型
}
```

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