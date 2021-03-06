
import Router from 'koa-router';
import getArgAndCheck from '../utils/getArgAndCheck';
import Project from './../models/Project';
import createCommonRes from './../utils/createCommonRes';
import result from 'lodash/result'

const project = new Router({ prefix: 'project' })


project.post('/', async ctx => {
  let res = createCommonRes()
  const { err, obj } = getArgAndCheck(ctx.request['body'], ['+name', 'description', 'testUrl'])
  if (err) {
    res.message = err;
    return ctx.body = res
  }

  let project = await Project.findOne({ name: obj['name'] })
  if (project && project['name']) {
    res.message = '该项目名称已存在'
    res.status = 1
    return ctx.body = res
  }
  let data = await Project.create(obj)
  if (data && data['name']) {
    res.message = '创建成功'
    res.status = 1
    res['payload'] = {
      project: data
    }
  }
  return ctx.body = res
})
//獲取項目,如果存在projectid，則只獲取其中一個
project.get('/', async ctx => {
  let res = createCommonRes()
  const { err, obj } = getArgAndCheck(ctx.state.query, ['id'])
  if (err) {
    res.message = err;
    return ctx.body = res
  }
  let allProject = null
  if (obj['id']) {
    allProject = await Project.findById(obj['id']);
  }
  else {
    allProject = await Project.find();
  }
  if (allProject) {
    res['payload'] = {
      data: allProject
    }
    res.message = '獲取成功'
    res.status = 1
  }
  return ctx.body = res
})

project.del('/', async ctx => {
  let id = result(ctx.query, 'id', [])
  let res = createCommonRes()
  await Project.deleteMany({ _id: { $in: id } })
  res.status = 1
  res.message = '删除成功!'
  return ctx.body = res
})


project.put('/', async ctx => {
  let res = createCommonRes()
  const { err, obj } = getArgAndCheck(ctx.request['body'], ['name', 'description', '+id', 'testUrl'])
  if (err) {
    res.message = err;
    return ctx.body = res
  }
  // let id = ctx.params['id']
  let id = obj['id']
  delete obj['id']
  obj['updatedAt'] = Number(new Date())
  let project = await Project.findByIdAndUpdate(id, obj, { new: true })
  if (project && project['_id']) {
    res.message = '修改成功'
    res.status = 1
    res['payload'] = {
      project
    }
  }
  return ctx.body = res
})



export default project;