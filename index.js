const express = require('express')
const app = express()

//设置jwt密钥 校验token用
app.set('secret', 'woshimiyao')

//允许跨域
app.use(require('cors')())
//接受json数据的中间件
app.use(express.json())

//前端web
app.use('/', express.static(__dirname + '/web'))
//后端admin
app.use('/admin', express.static(__dirname + '/admin'))
//前端web_3d
app.use('/3d', express.static(__dirname + '/3d'))

//nodejs想要被访问的东西必须依靠路由
//   -> /uploads:表示uploads路径下的都是静态文件。express.static:把uploads静态文件托管
app.use('/uploads', express.static(__dirname + '/uploads'))

//导入数据库
require('./plugins/mongodb')(app)
//导入路由
require('./routes/admin')(app)

require('./routes/web')(app)

/* 
app.get('/',(req,res)=>{
    res.send(`<h1>hello world</h1>`)
})
 */

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
