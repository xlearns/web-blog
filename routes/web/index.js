module.exports = (app) => {
  const router = require('express').Router({
    mergeParams: true,
  })
  const mongoose = require('mongoose')
  //导入http-assert 抛出错误用的
  const assert = require('http-assert')
  //导入jwt 生成token用的
  const jwt = require('jsonwebtoken')
  //分类
  const Category = mongoose.model('Category')
  //音乐
  const Audio = mongoose.model('Audio')
  //广告
  const Ad = mongoose.model('Ad')
  //视频
  const Video = mongoose.model('Video')
  //文章
  const Blog = mongoose.model('Blog')
  //用户
  const User = mongoose.model('User')
  //点赞
  const Sup = mongoose.model('Sup')
  //登入
  const Login = mongoose.model('Login')
  //留言
  const Msg = mongoose.model('Msg')
  const Mysup = mongoose.model('Mysup')
  //浏览量
  const Other = mongoose.model('Other')


  router.get('/db/list', async (req, res) => {
    const data = await Ad.find()
    res.send(data)
  })


  router.get('/other', async (req, res) => {
    const data = await Other.find()
    console.log(1)
    res.send(data)
  })

  router.post('/other', async (req, res) => {
    const Id = req.body.id
    const date = req.body.date
    const otype = req.body.type
    // console.log(date)
    if (!date || !Id || !otype) return res.send({ status: 0, message: '错误' })
    var model = {
      echartsWebVisits: [],
    }
    try {
      if (otype == 'webVisits') {
        let oData = await Other.findById(Id)
        var num
        model.webVisits = oData.webVisits + 1
        model.echartsWebVisits = oData.echartsWebVisits
        if (
          model.echartsWebVisits.some((v) => {
            return (
              new Date(v.date).setHours(0, 0, 0, 0) ==
              new Date(date).setHours(0, 0, 0, 0)
            )
          })
        ) {
          //已经存在
          model.echartsWebVisits = model.echartsWebVisits.map((v) => {
            if (
              new Date(v.date).setHours(0, 0, 0, 0) ==
              new Date(date).setHours(0, 0, 0, 0)
            ) {
              v.num += 1
            }
            return v
          })
        } else {
          //不存在
          model.echartsWebVisits.push({
            date: date,
            num: 1,
          })
        }
      }
      await Other.findByIdAndUpdate(Id, model)
      res.send({
        status: 1,
        data: '更新成功',
      })
    } catch (e) {
      res.send({
        status: 0,
        data: '更新失败',
      })
    }
  })

  //视频接口
  router.get('/videos/list', async (req, res) => {
    const parent = await Category.findOne({
      name: '精彩视频',
    })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: 'videos',
          localField: '_id',
          foreignField: 'parent',
          as: 'videoList',
        },
      },
    ])
    res.send(cats)
  })

  // 视频详情
  router.get('/video/:id', async (req, res) => {
    const data = await Video.findById(req.params.id).lean()
    res.send(data)
  })

  // 文章列表
  router.get('/content/', async (req, res) => {
    const data = await Blog.find()
    res.send(data)
  })

  // 文章详情
  router.get('/content/:id', async (req, res) => {
    const data = await Blog.findById(req.params.id).lean()
    data.related = await Blog.find()
      .where({
        categories: { $in: data.categories },
      })
      .limit(10)
    res.send(data)
  })
  // 归档
  router.get('/timeline', async (req, res) => {
    //待完善
    const data = await Blog.find().where({
      created_at: { $in: data.created_at },
    })
    res.send(data)
  })

  //用户注册接口
  router.post('/u/saveuser', async (req, res) => {
    var email = req.body.email
    var name = req.body.name
    if (!email || !name) return res.send({ status: 0, message: '错误' })

    var user = await User.findOne({
      email: email,
    })

    if (user) {
      res.send({
        status: 0,
        message: '账户已存在',
      })
    } else {
      try {
        var save = await User.create({ email: email, name: name })
        res.send({
          status: 1,
          data: save,
        })
      } catch (e) {
        res.send({
          status: 0,
          data: null,
        })
      }
    }
  })

  // 分页显示messages
  router.get('/m/showmsg/', async (req, res) => {
    const Id = req.query.msgId
    if (!Id) return res.send({ status: 0, message: '错误' })
    if (+Id === 1) {
      try {
        var show = await Msg.find({}).sort({ _id: -1 }).limit(10)
        res.send({
          status: 1,
          data: show,
        })
      } catch (e) {
        res.send({
          status: 0,
          data: '查询失败',
        })
      }
    } else {
      const sId = mongoose.Types.ObjectId(Id)
      try {
        var show = await Msg.find({ _id: { $lt: sId } })
          .sort({ _id: -1 })
          .limit(10)
        res.send({
          status: 1,
          data: show,
        })
      } catch (e) {
        res.send({
          status: 0,
          data: '查询失败',
        })
      }
    }
  })

  //保存留言接口
  router.post('/m/savemsg', async (req, res) => {
    var email = req.body.email
    var message = req.body.message
    console.log(req.body)
    if (!email || !message) return res.send({ status: 0, message: '错误' })
    var user = await User.findOne({
      email: email,
    })
    if (user) {
      try {
        var save = await Msg.create({ msg: message, name: user.name, sup: 0 })
        res.send({
          status: 1,
          data: save,
        })
      } catch (e) {
        res.send({
          status: 0,
          data: null,
        })
      }
    } else {
      res.send({
        status: 0,
        message: '未找到账户',
      })
    }
  })

  router.put('/m/reactions', async (req, res) => {
    const Id = req.body.msgId
    const like = req.body.like
    const heart = req.body.heart
    if (!Id || !like || !heart) return res.send({ status: 0, message: '错误' })
    try {
      let model = await Blog.findById(Id)
      model.like = model.like + 1
      model.heart = model.heart + 1

      let up = await Blog.findByIdAndUpdate(Id, model)
      res.send({
        status: 1,
        data: up,
      })
    } catch (e) {
      res.send({
        status: 0,
        data: '更新失败',
      })
    }
  })

  router.put('/m/comments', async (req, res) => {
    const Id = req.body.msgId
    const time = req.body.time
    const msg = req.body.msg
    const name = req.body.name

    if (!Id || !time || !msg || !name)
      return res.send({ status: 0, message: '错误' })
    try {
      let model = await Blog.findById(Id)
      model.msg.push(req.body)

      let up = await Blog.findByIdAndUpdate(Id, model)
      res.send({
        status: 1,
        data: up,
      })
    } catch (e) {
      res.send({
        status: 0,
        data: '更新失败',
      })
    }
  })

  // 评论点赞接口
  router.post('/m/upsup', async (req, res) => {
    const Id = req.body.msgId
    const upNum = req.body.upNum // 此次点赞次数
    if (!Id || !upNum) return res.send({ status: 0, message: '错误' })
    const sId = mongoose.Types.ObjectId(Id)
    try {
      var up = await Sup.update({ _id: sId }, { $inc: { sup: upNum } })
      res.send({
        status: 1,
        data: up,
      })
    } catch (e) {
      res.send({
        status: 0,
        data: '更新失败',
      })
    }
  })

  //获取本站点赞数接口
  router.get('/u/showsup', async (req, res) => {
    const token = 'Ichengxu'
    var user = await Mysup.findOne({
      token: token,
    })
    res.send({
      status: user ? 1 : 0,
      data: user,
    })
  })
  //登入校验中间件
  const auth = require('../../middleware/authUser')
  //获取用户名字
  router.post('/u/getusername/', auth(), async (req, res) => {
    let { username } = req.user
    res.send({
      username: username,
      _id: req.user._id,
      msg: 'ok',
    })
  })

  //用户注册
  router.post('/u/register/', async (req, res) => {
    const { username, password } = req.body
    assert(username, 402, '用户不能为空')
    assert(password, 402, '密码不能为空')
    user = await User.findOne({
      username: username,
    })
    assert(!user, 402, '用户已存在')
    const model = await User.create(req.body)
    res.send({
      username: username,
      msg: 'ok',
    })
  })
  //用户修改
  router.put('/u/updateuser/:id', async (req, res) => {
    let { password } = req.body
    assert(password, 402, '密码不能为空')
    const model = await User.findByIdAndUpdate(req.params.id, req.body)
    assert(model, 500, 'error')
    res.send(model)
  })

  //文章评论接口
  router.put('/u/writemsg', async (req, res) => {
    const { msg, time, id, name } = req.body
    assert(msg, 402, '消息不能为空')
    assert(time, 402, '时间不能为空')
    assert(id, 402, 'id不能为空')
    assert(name, 402, '名字不能为空')
    let model = await Blog.findById(id)
    assert(model, 402, '找不到文章')
    model.msg.push(req.body)
    let up = await Blog.findByIdAndUpdate(id, model)
    res.send({
      status: 1,
      data: model,
    })
  })

  //用户登入
  router.post('/u/login/', async (req, res) => {
    const { username, password } = req.body
    var user = await User.findOne({
      username: username,
    }).select('+password')
    assert(user, 422, '用户不存在')
    assert(password, 402, '密码不能为空')
    assert(
      require('bcrypt').compareSync(password, user.password),
      422,
      '密码不正确'
    )
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

  app.use('/web/api', router)
  //错误处理  4个参数表示错误处理 3个参数表示中间件
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    })
  })
}
