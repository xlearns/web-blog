module.exports = (app) => {
  //导入express模块
  const express = require('express')
  //定义express的子路由。目的是为了挂载到app.use定义好的url
  const router = express.Router({
    mergeParams: true, //表示合并父级url合并到里面router的url参数 不然req.parmas只能获取父级的url参数
  })
  //引入模型
  /*    const req.Model = require("../../models/req.Model") */

  //导入http-assert 抛出错误用的
  const assert = require('http-assert')
  //导入jwt 生成token用的
  const jwt = require('jsonwebtoken')
  //导入admin模型 用户表
  const AdminUser = require('../../models/AdminUser')
  //监听路由
  //添加数据
  router.post('/', async (req, res) => {
    //mongdb 添加数据 模型.create()
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  //分页列表
  router.get('/', async (req, res) => {
    //console.log(req.user) = > 可以访问到
    //mongdb 查询数据 模型.find() // limit()限制 //populate("xxx") 把关联的也取出
    //如果不加 populate("xxx") 则返回原本模型定义的的数据 并不会去取关联的数据
    //=>classify转类名
    const queryOptions = {}
    //req.Model.modelName 为模型的名称
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    //访问量
    if (req.Model.modelName === 'Other') {
      // console.log('ok')
    }
    const model = await req.Model.find().setOptions(queryOptions)
    // const model = await req.Model.find().setOptions(queryOptions).limit(100)
    assert(model, 500, 'error')
    res.send(model)
  })
  //根据id查询数据详情
  router.get('/:id', async (req, res) => {
    //mongdb 根据id查询数据详情 模型.findById() req.params.id获取url占位参数
    const model = await req.Model.findById(req.params.id)
    assert(model, 500, 'error')
    res.send(model)
  })
  //修改数据 模型.findByIdAndUpdate(id,data) 通过id去找。找到后更新掉。put请求
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    assert(model, 500, 'error')
    res.send(model)
  })
  //删除数据
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true,
    })
  })

  //登入校验中间件
  const auth = require('../../middleware/auth')
  app.use(
    '/admin/api/rest/:resource',
    auth(),
    async (req, res, next) => {
      //中间件
      //强制每一个都执行这个函数
      const modelName = require('inflection').classify(req.params.resource)
      //获取的模型挂载到req.Model上,这样
      req.Model = require(`../../models/${modelName}`)
      next()
    },
    router
  )

  //上传图片:
  const multer = require('multer')
  const upload = multer({
    //dest:目标地址既上传地址  __dirname:系统根地址
    dest: __dirname + '/../../uploads',
  })
  //upload 上传图片
  //中间件upload.single()表示单个文件的上传
  app.post(
    '/admin/api/upload',
    auth(),
    upload.single('file'),
    async (req, res) => {
      const file = req.file //本身req没有file这个属性 而是upload.single这个中间件给req上面加个名为参数的属性里面存放着上传的地址
      file.url = `http://localhost:3000/uploads/${file.filename}`
      res.send(file)
    }
  )

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    console.log(username, typeof username)
    //1根据用户名找用户 因为模型里面定义了select为false既不取它。select("+password") =>+代表要取它

    //findone({要找的数据库键名:变量})表示找一条数据
    const user = await AdminUser.findOne({
      username: username,
    }).select('+password')

    assert(user, 422, '用户不存在')
    assert(password, 401, '密码不能为空')
    /* if(!user){
            //执行终断条件
            //res.status设置状态码
            //状态码422 代表验证错误
            return res.status(422).send({
               message:"用户不存在"
            })
        } */

    //2校验密码
    //导入bcrypt模块用为是用他加密的所有得用它来校验compareSync(明文,加密得)比较明文和密文是否匹配
    assert(
      require('bcrypt').compareSync(password, user.password),
      422,
      '密码不正确'
    )
    /*     if(!require("bcrypt").compareSync(password,user.password)){
         return res.status(422).send({
            message:"密码不正确"
         })
      } */
    //3返回token
    // jwt.sign(要生成token的主题信息,密钥用于验证)=>生成token
    //app.get() 1个参数得时候为获取app.set得值。2个参数得时候为定义路由

    const token = jwt.sign(
      {
        id: user._id,
        /*   _id:user._id,
            username:user.username */
      },
      app.get('secret')
    )
    res.send({
      username: username,
      token: token,
    })
  })

  //错误处理  4个参数表示错误处理 3个参数表示中间件
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    })
  })
}
