
import * as Router from 'koa-router';
import Project from '../models/Project';
import Tag from '../models/Tag';

import copy from '../utils/copy';
import getArg from '../utils/getArg';
import getUpdateTime from '../utils/getUpdateTime';
import checkVersion from '../utils/checkVersion';
import { last } from 'lodash';
import addProject from '../actions/addProject';
import checkLimitAndPage from '../utils/checkLimitAndPage';

const project = new Router({ prefix: 'project' });

project.post('/', async ctx => {

  let { message, err } = await addProject(ctx.request.body);
  ctx.body = {
    code: err ? 401 : 201,
    message
  };

});

project.get('/', async ctx => {
  let { limit = process.env.LIMIT, page = 1 } = ctx.query;
  let obj = checkLimitAndPage(limit, page);
  if (obj.err) {
    ctx.body = {
      code: 402,
      message: obj.err
    };
    return;
  }
  let data = await Project.find().limit(obj.limit).skip(obj.skip);
  ctx.body = {
    code: 200,
    message: '获取成功',
    payload: {
      data
    }
  };

});

//增加版本
project.post('/version', async ctx => {
  let obj = getArg(ctx.request.body, ['version', 'id']);
  let data = await Project.findById(obj['id']);
  let oldVersion = last(data['version']);
  let canAdd = checkVersion(obj['version'], oldVersion);
  if (canAdd) {
    let objs = { ...obj, version: data['version'].concat(obj['version']), ...getUpdateTime() };
    let datas = await Project.findByIdAndUpdate(obj['id'], objs, { new: true });
    if (datas) {
      //将旧版本的tag复制到新版本去
      let oldVersionTags = await Tag.find({ blongTo: obj['id'], version: oldVersion }).select('-createdAt -updatedAt');
      let newVersionTags = oldVersionTags.map(i => {
        let item = copy(i);
        item['oldVersionId'] = item['_id'];
        item['version'] = obj['version'];
        delete item['_id'];
        return item;
      });
      await Tag.create(...newVersionTags);

      ctx.body = {
        code: 201,
        message: '增加版本号成功'
      };
    }
    else {
      ctx.body = {
        code: 403,
        message: '增加版本号失败'
      };
    }
  }
  else {
    ctx.body = {
      code: 403,
      message: '增加版本号失败'
    };
  }
});

project.put('/', async ctx => {
  let obj = getArg(ctx.request.body, ['title', 'description', 'id']);
  let id = obj['id'];
  delete obj['id'];
  const data = await Project.findByIdAndUpdate(id, { ...obj, ...getUpdateTime() }, { new: true });
  if (data) {
    ctx.body = {
      code: 201,
      message: '修改成功',
      payload: {
        data
      }
    };
  }
  else {
    ctx.body = {
      code: 402,
      message: '该项目不存在！'
    };
  }
});

export default project;