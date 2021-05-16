module.exports = (options) => {
  //导入http-assert 抛出错误用的
  const assert = require('http-assert')
  //导入jwt 生成token用的
  const jwt = require('jsonwebtoken')
  //导入admin模型 用户表
  const User = require('../models/User')

  return async (req, res, next) => {
    //校验用户是否登入中间件
    //split(" ")表示用空格分割 pop表示删除最后一项且返回删除的值
    const token = String(req.headers.authorization || '')
      .split(' ')
      .pop()
    //判断token是否存在 errorMessage=>jwt token不存在
    assert(token, 401, '请先登入')
    //jwt.verify(token,密钥)=>校验token
    // 在中间件里面是访问不到外面的app.set设置的值的解决办法req.app.get()
    const { id } = jwt.verify(token, req.app.get('secret'))
    //判断id是否存在 errorMessage=>无效的jwt token
    assert(id, 401, '请先登入')
    //挂载到req上之后。后面的也可以访问到
    req.user = await User.findById(id)
    assert(req.user, 401, '请先登入')
    await next()
  }
}
