
import * as Router from 'koa-router';
import Tag from '../models/Tag';
import getArg from '../utils/getArg';
import addTag from '../actions/addTag';

const tag = new Router({ prefix: 'tag' });

tag.post('/', async ctx => {

  let { err, message } = await addTag(ctx.request.body);
  ctx.body = {
    code: err ? 401 : 201,
    message
  };
});

tag.get('/', async ctx => {
  let obj = getArg(ctx.request.body, ['blongTo', 'version']);
  let data = await Tag.find({ ...obj });
  ctx.body = {
    code: 200,
    message: '获取成功',
    data
  };
});

tag.put('/', async ctx => {
  let obj = getArg(ctx.request.body, ['name', 'keys', 'id']);
  let id = obj['id'];
  delete obj['id'];
  let haves =  await Tag.findByIdAndUpdate(id, { ...obj });
  if (haves) {
    ctx.body = {
      code: 201,
      message: '修改成功'
    };
  }
  else {
    ctx.body = {
      code: 401,
      message: '修改失败'
    };
  }
});

tag.del('/', async ctx => {
  let obj = getArg(ctx.request.body, ['id']);
  await Tag.findByIdAndRemove(obj['id']);
  ctx.body = {
    code: 201,
    message: '删除成功'
  };
});

tag.get('/:id/:version', async ctx => {
  let { id, version } = ctx.params;
  let data = await Tag.find({ version, blongTo: id });
  ctx.body = {
    code: 200,
    message: data ? '获取成功' : '获取失败',
    payload: {
      data
    }
  };
});

export default tag;