
import Router from 'koa-router';
import createCommonRes from '../utils/createCommonRes';
import Api from '../models/Api';
import Project from './../models/Project';
// import request from '../utils/request'
import transformRes from '../utils/transformRes';
import compareTwoObjTypeAndRequired from '../utils/compareTwoObjTypeAndRequired';
const mock = new Router({ prefix: 'mock' })

mock.get('/x', async ctx => {
  return ctx.body = 'xxx'
})

//本部分为核心逻辑
mock.all('/:projectid/:router*', async ctx => {
  let res = createCommonRes();
  let method = ctx.method;
  let arg = method === 'GET' || 'DELETE' ? ctx.request['body'] : ctx.request.query
  let projectid = ctx.params['projectid']
  let router = '/' + ctx.params['router']
  //查询当前项目、当前路由下是否存在该方法
  let apiArg = await Api.findOne({ belongTo: projectid, method, router })
  let projectArg = null
  if (!apiArg) {
    //如果不存在，查询当前项目信息
    projectArg = await Project.findById(projectid)
    if (!projectArg) {
      res.message = '不存在该项目或者项目ID错误';
      return ctx.body;
    }
    else {
      res.message = `${router}下${method}不存在！`
      return ctx.body;
      //不存在testUrl   当前版本不做
      // if(projectArg&&!projectArg['testUrl']){
      //   return ctx.body;
      // }
      // else {
      //   //存在，向其发起请求
      //   let res = await request
      // }
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
  return ctx.body = newRes
})

export default mock