# admin
## 下载vuecli
`npm i -g @vue/cli`
## 开始
1. 初始化项目
- vue create admin 【后台界面】
- vue create web   【移动端】
- vue create server 【后台界面】
- cd server
- npm init -y 【初始化node项目(-y 代表yes) 会生成一个package.json文件(里面的main属性为入口文件,scripts为控制脚本)】
- touch index.js 【创建入口文件】
    
2. 配置package.json文件
```js
"scripts": {
        "serve":"nodemon index.js",
        ...
  } 
```
- nodemon 当修改用它运行的文件时会热刷新

## 基于Element UI的后台管理(admin)界面搭建
1. cd admin
2. npm run serve
3. vue add element (一路回车)
   -  Fully import √(完全引用) 
   -  Do you wish to overwrite Element's 
   -  SCSS variables?  ×(用scss)
   -  zh-CN 对(语言)
4. vue add router (安装路由)) 

   - Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n) n

5. 打开elementUi的官网(https://element.eleme.io/#/zh-CN/component/installation)【复制需要的组件】

6. admin  ->  src -> views
   -  touch Main.vue (创建一个组件)
   -  把复制的代码拷贝到 Main.vue中

7. admin -> src -> router -> index.js
   - import Home from '../views/Main.vue' (导入Main组件)

8. 修改路由:
```js
 const routes = [
  {
    path: '/',      //url的映射。 当/时候渲染main的组件
    name: 'main',
    component: Main //=>组件 变量为刚才引入的组件
  }
]
```

9.  修改App.vue文件 只留下<route-view /> 删除默认样式

10. height:100vh; 为窗口高度


## 创建分类

1. admin-> src-> views->Main.vue (修改样式)

- <el-menu router> 【router属性让点击跳转index指定的路由】

2. admin -> src -> views
  - touch CategoryEdit.vue
  - touch CategoryList.vue

3. admin-> src-> router-> index.js
  - 路由的路由为子路由
 ```js
 {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      {
        path: '/categories/create',
        name: 'CategoryEdit',
        component: CategoryEdit
      },
      {
        path: '/categories/list',
        name: 'CategoryList',
        component: CategoryList
      }
    ]
  }
```
4. admin-> src-> views-> CategoryEdit.vue 
5. npm i axios
   - touch http.js
6. http.js
```js
//导入 axios
import axios from 'axios'
//设置基础公告请求路径
const http = axios.create({
    baseURL:"http://localhost:3000/admin/api"
})
//导出 http
export default http
 -->
 cnpm install axios -S //=>安装axios模块 -S=--save 放到生产依赖中。-D=--save -dev 放到开发依赖
 admin-> src-> main.js 引入http.js
 import http from './http'

 并且把它挂载到vue实例的原型上面
 Vue.prototype.$http=http
 使用axios

 this.$http.get(url).then(res=>{console.log(res.data)})
 this.$http.post(url,sendDate).then(res=>{console.log(res.data)})
 async function(){
    const res = await this.$http.post(url,sendDate)
 }
```
## server:
- npm i express@next mongoose cors 【安装express @next为下一个版本 mongoose为链接数据库的、cors为允许跨域】
- server -> index.js
```js
//引入express模块
const express = require('express')
//执行express方法
const app = express()
//监听3000端口
app.listen(3000,()=>{
    console.log("http://localhost:3000")
})
```
- 定义路由:
  - mkdir routes //=> router文件存放路由
  - cd routes 
  - mkdir routes //=>存放后端路由
  - touch index.js //=>具体路由
```js
 //小技巧：
 //module.exports 导出的为一个函数
 module.exports = app =>{
     //定义具体路由
     //导入express模块
    const express=require('express')
     //定义express的子路由。目的是为了挂载到app.use定义好的url
    const router=express.Router()
     //监听/categories路由
    router.post('/categories',async(req,res)=>{

    })
    app.use('admin/api',router)
 }
```

- 导入路由文件 `require(路由文件的url)(require(express)())`
- 链接数据库
 - mkdir plugins 【存放数据库文件夹】
 - cd plugins
 - touch mongodb.js 【具体数据库文件】
- mkdir models 【存放数据库的表schema与模型model表为模型的参数】

## mongodb
- 下载 mongodb
- 配置环境变量
  - 这样哪都可用不然只能去bin文件夹下执行命令然后启动`mongodb : mongod --dbpath dbUrl`可以写入bat打开可视化mongodb可以看见建立的表与数据
- mongoose:用于nodejs链接mongodb的包
### 使用步骤：
1. 导入mongoose
`let mongoose = require("mongoose")`
2. 链接mongdb
```js
mongoose.connect("mongdb://127.0.0.1:27017",{
  //不写会报错或者警告
   useNewUrlParser:true,
   useUnifiedTopology: true
})
```
3. 创建表
```js
new mongoose.Schema({
  //定义表结构
    name:{
        type:String
    }
})
```
4. 创建模型并将表添加到模型中
```js
mongoose.model(模型名字,创建的表)
mongoose.model('test',new mongoose.Schema({
  //定义表结构
    name:{
        type:String
    }
}))
```
### mongoose的增删改查
- mongdb 查询数据 模型.find() 
- limit()限制 
- populate("xxx") 把关联的也取出
- 如果不加 populate("xxx") 则返回原本模型定义的的数据 并不会去取关联的数据
- mongdb 根据id查询数据详情 模型.findById() req.params.id获取url占位参数
- 修改数据 模型.findByIdAndUpdate(id,data) 通过id去找。找到后更新掉。put请求

### mongoose的扁平化同级数据关联
- 首先定义表的结构
- 根据id关联。既然需要传递两个字段一个父类id一个内容字段
```js
const schema = new mongoose.Schema({
    name:{
        type:String
    },
    parent:{
        type:mongoose.SchemaTypes.ObjectId,
        //=>表示它是mongodb数据库里面的id
        ref:"Category"
        //=>关联的模型
    }
})
```
# server:
- 通用 CRUD 接口 【通过一套后端接口。就能给所有资源使用】
- CRUD ->create Read update delete
  - 原理根据url的参数来动态获取model模型
- 中间件就是每一项都会用到这个函数
```js
中间件(req,res,next){
  next()
}
```
- cnpm install inflection -S 【用于转换大小写 单复数】
- require("inflection").classify(req.params.resource) 【classify方法用于将参数转换为首字母大写和单数】

### 文件上传:
- express本身获取不到上传文件
- multer中间件处理上传数据
- `cnpm install -S multer`
导入multer模块
```js
const  multer = require("multer")
//upload上传文件
const  upload = multer({
       //dest:目标地址既上传地址  __dirname:系统根地址
       dest:__dirname+"/../../uploads"
})
//中间件upload.single()表示单个文件的上传
app.post('/admin/api/upload',upload.single("file"),async (req,res)=>{
     const file = req.file //本身req没有file这个属性 而是upload.single这个中间件给req上面加个名为参数的属性里面存放着上传的地址
     file.url=`http://localhost:3000/uploads/${file.filename}`
     res.send(file)
})
```
### 富文本:
- element里面并没有富文本编辑器
- 使用第三方vue富文本编译器
    - vue2-editor
    - vue-quill-editor
#### vue2-editor
`npm install -S vue2-editor`
- 富文本的图片上传
- 默认图片上传会转换成base64位 然后直接镶嵌在页面上
- 优点省事不需要做图片上传
- 缺点页面会过于庞大。图片越大加载越慢
解决办法：
- 做个图片上传把url地址存在再页面即可

### 广告位
- 首页轮播图
### 权限:
-登入
1. 根据用户名查询数据库看是否存在。不能查询密码。因为密码已经被加密过了。
不存在直接返回信息和状态码422。一般都是422代表传递得参数有误
2. 校验密码。因为本身是通过bcrypt加密得。所有也需要用它来校验bcrypt.compareSync(明文传过来得密码,密文加密得密码)。不匹配直接返回信息和状态码422
3. 成功生成token

#### token
- `cnpm install -S jsonwebtoken`
- jwt.sign(要生成token的加密的数据比如id,密钥用于验证)=>生成token
//app.get() 1个参数得时候为获取app.set得值。2个参数得时候为定义路由

- 问题:
 - 为什么他没用中间件。为啥还可以接收到post请求的数据?
 - 因为新版的express 使用express.json()就可以处理json请求

#### 后端密码加密:
- 通过bcrypt包散列加密
- bcrypt优点。不可逆。即使是同一个数字每一次加密都会生成不一样的字符
而且生成的字符毫无规律可言.比md5更安全的一种加密
- 安装`cnpm install -S bcrypt`
```js
//导入bcrypt
//hashSycn(要加密的数据,加密等级推荐10~12)
require("bcrypt").hashSync()
```
#### 模型
- mongoose模型里面装着表结构
- 如果模型的表结构设置了select：false则表示后面的结构查询的时候不会显示。换句话说只能存值。不能获取要获取。如果要获取设置了select属性的值。可以再后面调用select(+"要查询的字段")方法


#### 报错
- `cnpm install -S http-assert`
- 导入包`const assert = require("http-assert")`
- 用法`assert(要判断的东西,当为假时候执行的状态码,当为假时候的提示信息)`
```js
cd server
把一个文件夹下面的所有文件。引用进来
npm i require-all
```

# web:

1. 工具样式概念和sass(scss)
安装sass 但是一般都是用.scss文件`cnpm install -D sass sass-loade sass`
- 特性: 
    - 可以嵌套写法
    - 可以使用变量写法
    - `@each $var in list`表示循环 
2. 样式重置
3. 网站设置和字体定义(colors,text)
4. 通用flex布局样式定义(flex)
5. 常用边距定义(margin,padding)
6.首页顶部轮播图片(vue swiper)
   - `npm / github ->search: vue swiper`
   - `npm install vue-awesome-swiper --save`
7. 使用字体图标(iconfont)
8. 使用精灵图片(sprite)
9. 卡片组件(card)
10. 列表卡片组件(list-card,nav,swiper)
### 精灵图处理sprite:
- [用工具处理精灵图定位问题](http://spritecow.com/)
- 处理时间的包可以任意格式化时间(dayjs或者moment)：
- 安装:`cnpm install dayjs -S`
  - 引入:`import dayjs from dayjs`
  - 用法:dayjs(val).format("自定义格式")
  - dayjs(val).format("MM/DD") 【显示月和日】
### swiper：
- 安装:`cnpm install swiper -S`
```html
//@slide-change表示滑动触发
//$refs.list.swiper.realIndex 表示获取ref为list得真实index
//$refs.list.swiper.slideTo(i)表示跳转到swiper得index处
 <swiper ref='list'  @slide-change="()=>active=$refs.list.swiper.realIndex">
     <swiper-slide v-for="(n,i) in arr" :key="i"> 
         <slot name='items' :category='n'></slot>
     </swiper-slide>
 </swiper>  
```
### 过滤器filters
- xx.vue:
```js
export default{
  filters:{
    //定义过滤器
    data(var,var1){
      var代表过滤得值
      var1为过滤器传递得参数
      return xxx
    }
  }
}
```
### 其它
- 文字溢出显示省略号：
    ```css
    .text{
      display: inline-block;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap
    }
    ```
- for in与for of 的区别
  - for(let i in arr) i=>index
  - for(let i of arr) i=>value

# 发布
- 阿里云服务器
- 域名
- ssh@root ip
- 包安装
  - unbantu -> apt install xxx -y
  - centeos -> yum install xx -y
- 安装nginx `apt install nginx -y`
- [配置nginx](https://juejin.im/post/5ea931866fb9a043815146fb) 
   - 找到nginx.conf【etc/nginx/nginx.config】
   - proxy_pass 配置反向代理
- 安装mongodb：这里安装得为mongodb得服务端`apt install mongodb-server -y`
- 导出mongodb数据 `mongodump -d  数据库名`会生成一个dump文件夹，将dump文件夹复制到需要恢复数据的地方通过输入命令`mongorestore`数据库即可导入





