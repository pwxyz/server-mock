
import * as Router from 'koa-router';
import getArgAndCheck from '../utils/getArgAndCheck';
import Api from './../models/Api';


const api = new Router({ prefix: 'api' });

api.post('/', async ctx => {
  let res = {
    status: -1,
    message: 'service error'
  }
  const { err, obj } = getArgAndCheck(ctx.request.body, ['+router', '+method', 'headers', 'req', 'res'])
  if(err){
    res.message = err;
    return ctx.body = res
  }
  let apis = await Api.findOne({ router: obj['router'], method: obj['method'] });
  if(apis&&apis['router']){
    res.message = `该router下的method已存在`
    return ctx.body = res 
  }
  apis = await Api.create(obj)
  res.status = 1;
  res.message = '创建成功';
  res['payload'] = {
    api: apis
  }
  return ctx.body = res
})


export default api