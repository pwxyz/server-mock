
import Router from 'koa-router';
import User from './../models/User';
import getArgAndCheck from './../utils/getArgAndCheck';
import encrypt from '../utils/encrypt';
import { signJwt } from '../utils/jsonwebtoken';
import createCommonRes from '../utils/createCommonRes';

const login = new Router({ prefix: 'login' });



login.post('/', async ctx => {
  let res = createCommonRes()
  const { err, obj } = getArgAndCheck(ctx.request['body'], ['+name', '+password'])
  if (err) {
    res.message = err
    return ctx.body = res
  }
  let user = await User.findOne({ name: obj['name'] });
  let password = encrypt(obj['password'])
  if (!user || !user['name'] || user['password'] !== password) {
    res.message = '该用户名不存在或者密码不正确'
    return ctx.body = res
  }
  let token = signJwt({ id: user['_id'], name: user['name'] })
  res['payload'] = {
    token
  }
  res.status = 1
  res.message = '登陸成功'
  return ctx.body = res
});

login.post('/verify', async ctx => {
  let res = createCommonRes()
  res.status = 1
  res.message = 'token 有效'
  res['payload'] = {
    isLogin: true
  }
  return ctx.body = res
})


login.put('/', async ctx => {
  let res = createCommonRes()
  const arg = getArgAndCheck(ctx.request['body'], ['+name', '+password']);
  if (arg.err) {
    res.message = arg.err
    return ctx.body = res
  }
  let obj = arg.obj
  let user = await User.findOne({ name: obj['name'] })
  if (user && user['name']) {
    res.message = '该用户已存在';
    return ctx.body = res
  }
  let password = encrypt(obj['password'])
  let data = await User.create({ name: obj['name'], password })
  if (!data) {
    return ctx.body = res
  }
  let token = signJwt({ id: data['_id'], name: data['name'] })
  res['payload'] = {
    token
  }
  res.status = 1
  res.message = '用戶創建成功'
  return ctx.body = res
})


export default login;