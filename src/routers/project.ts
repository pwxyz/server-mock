
import * as Router from 'koa-router';
import getArgAndCheck from '../utils/getArgAndCheck';
import Project from './../models/Project';


const project = new Router({ prefix:'project' })


project.post('/', async ctx => {
  let res = {
    status: -1,
    message: 'service error'
  }
  const { err, obj } = getArgAndCheck(ctx.request['body'], ['+name', 'description', 'testUrl'])
  if(err){
    res.message = err ;
    return ctx.body = res
  }

  let project = await Project.findOne({ name: obj['name'] })
  console.log(project, obj)
  if(project&&project['name']){
    res.message = '该项目名称已存在'
    res.status =1
    return ctx.body = res 
  }
  let data = await Project.create(obj)
  if(data&&data['name']){
    res.message = '创建成功'
    res.status = 1
    res['payload'] = {
      project: data
    }
  }
  return ctx.body = res
})

project.put('/:id', async ctx => {
  let res = {
    status: -1,
    message: 'service error'
  }
  const { err, obj } = getArgAndCheck(ctx.request['body'], ['name', 'description', '+id', 'testUrl' ])
  if(err){
    res.message = err ;
    return ctx.body = res
  }
  let id = ctx.params['id']
  obj['updatedAt'] = Number(new Date())
  let project = await Project.findByIdAndUpdate(id, obj, { new: true })
  if(project&&project['_id']){
    res.message = '修改成功'
    res.status = 1
    res['payload'] = {
      project
    }
  }
  return ctx.body = res
})



export default project;