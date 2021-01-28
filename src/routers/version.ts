

import Router from 'koa-router'
import getArgAndCheck from '../utils/getArgAndCheck';
import Version from './../models/Version';
import Api from './../models/Api';
import createCommonRes from './../utils/createCommonRes';
import get from 'lodash/get'
import mongoose from 'mongoose'
const version = new Router({ prefix: 'version' })


version.post('/', async ctx => {
  let res = createCommonRes()
  const { err, obj } = getArgAndCheck(ctx.request['body'], ['+name', '+belongTo', 'parent'])
  let versionArg = await Version.findOne({ name: get(obj, 'name'), belongTo: get(obj, 'belongTo') })
  if (err) {
    res.message = err;
    return ctx.body = res
  }
  if (versionArg && get(versionArg, 'name')) {
    res.message = '该版本已存在'
    res.status = 1
    return ctx.body = res
  }

  //找出父级所有的api信息, 如果版本存在，找出改版本信息，如果不存在，则找出所有
  let arr = get(obj, 'parent') ? await Api.find({ belongTo: get(obj, 'belongTo'), version: get(obj, 'parent') }, { '_id': 0 }).sort('-updatedAt') : await Api.find({ belongTo: get(obj, 'belongTo'), version: { $exists: false } }, { '_id': 0 }).sort('-updatedAt')



  let data = await Version.create(obj)

  console.log('sssd', get(data, '_id'), mongoose.Types.ObjectId((get(data, '_id'))), arr.length)
  arr = arr.map(i => {

    i['version'] = mongoose.Types.ObjectId((get(data, '_id')))
    return i
  })

  let arrData = await Api.insertMany(arr)
  // let arrData = await Api.insertMany(arr)
  if (get(data, 'name')) {
    res.message = '创建成功'
    res.status = 1
    res['payload'] = {
      version: data,
      api: arrData
    }
  }
  return ctx.body = res
})

version.get('/', async ctx => {
  let res = createCommonRes()
  const { err, obj } = getArgAndCheck(ctx.state.query, ['id'])
  if (err) {
    res.message = err;
    return ctx.body = res
  }
  let data = await Version.find({ belongTo: get(obj, 'id') })
  if (data) {
    res.message = '获取成功'
    res.status = 1
    res['payload'] = {
      data
    }
  }
  res.message = 'id不正确'
  return ctx.body = res
})


export default version