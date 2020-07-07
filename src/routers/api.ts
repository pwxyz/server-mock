
import Router from 'koa-router';
import getArgAndCheck from '../utils/getArgAndCheck';
import Api from './../models/Api';
import Project from './../models/Project';
import request from '../utils/request'
import createCommonRes from '../utils/createCommonRes';
import Tag from '../models/Tag';
import result from 'lodash/result';


const api = new Router({ prefix: 'api' });

api.post('/', async ctx => {
  let res = createCommonRes()
  // console.log(new Date())
  const { err, obj } = getArgAndCheck(ctx.request['body'], ['+router', '+method', 'headers', 'req', 'res', '+belongTo', 'remark', 'noused', 'tag', 'sleep'])
  if (err) {
    res.message = err;
    return ctx.body = res
  }
  let apis = await Api.findOne({ router: obj['router'], method: obj['method'], belongTo: obj['belongTo'] });
  if (apis && apis['router']) {
    res.message = `该router下的method已存在`
    return ctx.body = res
  }
  apis = await Api.create(obj)
  res.status = 1;
  res.message = '創建成功';
  res['payload'] = {
    api: apis
  }
  return ctx.body = res
})
//獲取所有api，或者是某個項目的所有api
api.get('/', async ctx => {
  let res = createCommonRes()
  const { err, obj } = getArgAndCheck(ctx.state.query, ['id'])
  if (err) {
    res.message = err;
    return ctx.body = res
  }
  let allApi = null
  let tagList = []
  if (obj['id']) {
    allApi = await Api.find({ belongTo: obj['id'] }).populate('tag').sort('-updatedAt')
    tagList = await Tag.find({ belongTo: obj['id'] })
    // tagList = tagList.map(i => {
    //   let obj = { ...i }
    //   let arr = allApi.filter(item => {
    //     console.log(item, i)
    //     return result(item, 'tag._id') === result(i, '_id')
    //   })

    //   obj['children'] = arr || []
    //   return obj
    // })
  }
  else {
    allApi = await Api.find().populate('tag').sort('-updatedAt')
  }

  if (allApi) {
    // allApi = allApi.filter(i => !i['tag'])
    res = createCommonRes({ payload: { data: allApi, tagList }, message: '获取成功' })
  }

  return ctx.body = res
})

//獲取單個的api
api.get('/:apiId', async ctx => {
  let res = createCommonRes()
  let apiId = ctx.params['apiId']
  if (!apiId) {
    res.message = '缺少必要的参数id'
    return ctx.body = res
  }
  let apis = await Api.findById(apiId).populate('tag')
  if (apis) {
    res.message = '获取成功'
    res.status = 1
    res['payload'] = {
      data: apis
    }
  }
  res.message = 'id不正确'
  return ctx.body = res
})

//获取单个的api
api.delete('/:apiId', async ctx => {
  let res = createCommonRes()
  let apiId = ctx.params['apiId']
  if (!apiId) {
    res.message = '缺少必要的参数id'
    return ctx.body = res
  }
  let apis = await Api.findByIdAndDelete(apiId)
  if (apis) {
    res.message = '删除成功'
    res.status = 1
    return ctx.body = res
  }
  res.message = '错误的id'
  return ctx.body = res
})


api.put('/:id', async ctx => {
  let res = createCommonRes()
  const { err, obj } = getArgAndCheck(ctx.request['body'], ['+router', '+method', 'headers', 'req', 'res', 'remark', 'noused', 'tag', 'sleep'])
  if (err) {
    res.message = err;
    return ctx.body = res
  }
  let id = ctx.params['id']
  obj['updatedAt'] = Number(new Date())
  let apis = await Api.findByIdAndUpdate(id, obj, { new: true })
  if (apis && apis['_id']) {
    res.message = '修改成功',
      res.status = 1
    res['payload'] = {
      api: apis
    }
  }

  return ctx.body = res
})

// 此处为自动添加路由，默认headers中只有access-token
// api.all('/auto/:projectId/:router*', async ctx => {
//   let resObj = createCommonRes()
//   const { router, projectId } = ctx.params
//   const method = ctx.method
//   let belongTo = projectId
//   const headers = {
//     "access-token": "this is token"
//   }
//   const req = { ...ctx.state.query, ...ctx.request['body'] }
//   let projectArg = await Project.findById(projectId)

//   let haveApi = await Api.findOne({ router, method, belongTo })

//   if (haveApi) {
//     resObj.status = 1
//     resObj.message = `在该项目中，${router}下的${method}方法已存在，不再进行添加，如要修改，可以进行单独编辑`
//     return ctx.body = resObj
//   }

//   if (projectArg && projectArg['testUrl']) {
//     let url = projectArg['testUrl'] + router

//     // let res = await axios[method.toLowerCase()](projectArg['testUrl']+router, req)
//     let res = await request({ url: projectArg['testUrl'] + router, method: method.toLowerCase(), req })
//     // console.log(res)
//     if (res) {
//       let obj = { router, method, headers, req, res, belongTo }
//       let newprject = await Api.create(obj)
//       resObj.status = 1
//       resObj.message = '新增api成功'
//       resObj['payload'] = newprject
//       return ctx.body = resObj
//     }
//   }
//   return ctx.body = resObj

// })

export default api