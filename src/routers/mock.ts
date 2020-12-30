
import Router from 'koa-router';
import createCommonRes from '../utils/createCommonRes';
import Api from '../models/Api';
import Project from './../models/Project';
import request from '../utils/request'
import transformRes from '../utils/transformRes';
import compareTwoObjTypeAndRequired from '../utils/compareTwoObjTypeAndRequired';
import getMethod from '../utils/getMethod'
import result from 'lodash/result'
import transformReq from './../utils/transformReq';
import sleep from './../utils/sleep';
import get from 'lodash/get';

import isArray from 'lodash/isArray'
const mock = new Router({ prefix: 'mock' })
mock.get('/x', async ctx => {
  return ctx.body = 'xxx'
})



const transformArg = (arg = {}) => {
  try {
    let obj = {}
    for (let key in arg) {
      if (isArray(arg[key])) {
        obj[decodeURIComponent(key)] = decodeURIComponent(arg[key])
      }
      else if (typeof arg[key] === 'object') {
        obj[decodeURIComponent(key)] = transformArg(arg[key])
      }
      else {
        obj[decodeURIComponent(key)] = decodeURIComponent(arg[key])
      }
    }
    return obj
  }
  catch (_) {
    return arg
  }
}

//本部分为核心逻辑
mock.all('/:projectid/:router*', async ctx => {
  let res = createCommonRes();
  let method = ctx.method;

  let arg1 = ['GET', 'DELETE'].includes(method) ? transformArg(ctx.state.query) : ctx.request['body']
  let arg = transformReq({ ...arg1 }) || {}
  let projectid = ctx.params['projectid']
  let router = '/' + ctx.params['router']

  let url = `http://${process.env.WEB_URL}/project/${projectid}`
  if (!ctx.params['router']) {
    return ctx.redirect(url)
  }
  let projectArg = null
  projectArg = await Project.findById(projectid)
  let routerPrefix = result(projectArg, 'routerPrefix')
  router = routerPrefix ? router.replace(routerPrefix, '') : router

  //查询当前项目、当前路由下是否存在该方法
  let apiArg = await Api.findOne({ belongTo: projectid, method, router })
  if (!apiArg) {
    //如果不存在，查询当前项目信息
    if (!projectArg) {
      res.message = '不存在该项目或者项目ID错误';
      return ctx.body;
    }
    else {
      res.message = `${router}下${method}不存在！`
      // return ctx.body;

      if (projectArg && !projectArg['testUrl']) {
        return ctx.body;
      }
      else if (projectArg['allowAdd']) {
        //存在，向其发起请求

        // console.log('allowAdd', router)
        let apires = await request({ url: projectArg['testUrl'] + router, method: getMethod(method), data: arg })
        if (apires) {
          let obj = {
            router,
            method,
            req: arg,
            res: apires,
            noused: true,  //目前自动入库的将自动标记不使用，如需使用，需要手动改回来
            belongTo: projectid
          }
          let newapi = await Api.create(obj)
          if (newapi) {
            return ctx.body = apires
          }
        }
      }
      return ctx.body
    }
  }
  //校验必须参数
  let { err } = compareTwoObjTypeAndRequired(arg, apiArg['req'])
  if (err) {

    res.message = err
    return ctx.body = res
  }

  //转换res参数
  let newRes = transformRes(apiArg['res'], arg)
  let num = get(apiArg, 'sleep', 0)
  if (num) {
    await sleep(num)
  }

  return ctx.body = newRes
})

export default mock