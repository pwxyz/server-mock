
import * as Router from 'koa-router';
import Api from '../models/Api';
import getArg from '../utils/getArg';
import getUpdateTime from '../utils/getUpdateTime';
import addApi from '../actions/addApi';
import checkLimitAndPage from '../utils/checkLimitAndPage';

const api = new Router({ prefix: 'api' });


//在输入数据中，目前暂不考虑校验数据格式

api.post('/', async ctx => {
  let { err, message, data } = await addApi(ctx.request.body);
  ctx.body = {
    code: err ? 401 : 201,
    message,
    data
  };
});

//暂不考虑支持单独api升级或者修改版本
api.put('/:id', async ctx => {
  let obj = getArg(ctx.request.body, ['res', 'path', 'method', 'tag', 'req', 'blongTo']);
  // let id = obj['id'];
  let id = ctx.params['id'];
  // delete obj['id'];
  let data = await Api.findOneAndUpdate(id, { ...obj, ...getUpdateTime() }, { new: true });
  ctx.body = {
    code: 201,
    message: data ? '修改成功' : '修改失败',
    data
  };
});

api.get('/:projectid/:version', async ctx => {
  let { projectid, version } = ctx.params;
  // eslint-disable-next-line no-undefined
  let { limit = process.env.LIMIT, page = 1, tag = undefined } = ctx.query;
  let obj = checkLimitAndPage(limit, page);
  if (obj.err) {
    ctx.body = {
      code: 402,
      message: obj.err
    };
    return;
  }
  let findObj = tag ? { blongTo: projectid, version, 'tag.keys': tag } : { blongTo: projectid, version };

  let data = await Api.find(findObj).limit(obj.limit).skip(obj.skip).sort('tag.keys');
  // let data = await Api.aggregate([
  //   {
  //     $match: { version, blongTo: projectid }
  //   },
  //   {
  //     $group: {
  //       _id: '$tag.keys', data: { $push: '$path' }
  //     }
  //   }
  // ]);
  let total = await Api.find(findObj).count();
  ctx.body = {
    code: data ? 200 : 401,
    message: data ? '成功' : '失败',
    payload: {
      data,
      total
    }
  };
});

api.del('/:id', async ctx => {
  // let obj = getArg(ctx.request.body, ['id']);
  let id = ctx.params['id'];
  try {
    await Api.findByIdAndRemove(id);
    ctx.body = {
      code: 201,
      message: '删除成功'
    };
  }
  catch (err) {
    ctx.body = {
      code: 402,
      message: '删除失败',
      err
    };
  }

});

export default api;