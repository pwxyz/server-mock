import Router from 'koa-router';
import Tag from '../models/Tag'
import result from 'lodash/result'
import createCommonRes from '../utils/createCommonRes';
import getArgAndCheck from '../utils/getArgAndCheck';

const tag = new Router({ prefix: 'tag' })

tag.get('/', async ctx => {
  let projectid = result(ctx.state.query, 'projectid')
  let data = projectid ? await Tag.find({ belongTo: projectid }) : await Tag.find()
  let res = createCommonRes()
  if (data) {
    res['payload'] = {
      data
    }
    res.status = 1
    res.message = '获取成功'
  }
  return ctx.body = res
})

tag.post('/', async ctx => {
  let res = createCommonRes()
  const { err, obj } = getArgAndCheck(ctx.request['body'], ['+name', '+description', '+belongTo'])
  if (err) {
    res.message = err
    return ctx.body = res
  }
  let objs = await Tag.findOne({ name: obj['name'], belongTo: obj['belongTo'] })
  if (objs) {
    res.message = `name重复`
    return ctx.body = res
  }
  let data = await Tag.create(obj)
  res['payload'] = {
    data
  }
  res.message = '新增成功'
  return ctx.body = res
})

tag.put('/:tagid', async ctx => {
  let res = createCommonRes()
  const { err, obj } = getArgAndCheck(ctx.request['body'], ['+name', '+description', '+belongTo', '+id'])
  if (err) {
    res.message = err
    return ctx.body = res
  }
  let objs = await Tag.find({ name: obj['name'], belongTo: obj['belongTo'] })
  if (objs && objs.length > 1) {
    res.message = `name重复`
    return ctx.body = res
  }
  let id = obj['id']
  delete obj['id']
  let data = await Tag.findByIdAndUpdate(id, obj, { new: true })
  res['payload'] = {
    data
  }
  res.message = '修改成功'
  return ctx.body = res
})

tag.delete('/:tagid', async ctx => {
  let res = createCommonRes()
  let id = ctx.params['tagid']
  await Tag.findByIdAndRemove(id)
  res.status = 1
  res.message = '删除成功'
  return ctx.body = res
})

export default tag