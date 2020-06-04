
import Router from 'koa-router';
import getArgAndCheck from '../utils/getArgAndCheck';
import Api from './../models/Api';
import Project from './../models/Project';
import request from '../utils/request'
import createCommonRes from '../utils/createCommonRes';
import Tag from '../models/Tag';
import result from 'lodash/result';
import getDocx from './../utils/docx';
import get from 'lodash/get'
import dayjs from 'dayjs'
const download = new Router({ prefix: 'download' });


//下载docx格式文档
download.post('/:id', async ctx => {
  let res = createCommonRes()
  let id = ctx.params['id']
  if (!id) {
    res.message = 'id不存在';
    return ctx.body = res
  }
  let data = await Api.find({ belongTo: id }).populate('tag').sort('router')
  let nameArg = await Project.findById(id)
  let name = `${get(nameArg, 'name')}_${dayjs().format('YYYY-MM-DD_HH_mm_ss')}`.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\-_.]/g, '_')
  let url = await getDocx(data, name)
  //暂时注释定时删除部分
  // setTimeout(() => {

  // }, 30 * 60 * 1000)  //定时器  30分钟后删除文件 
  res['payload'] = {
    url
  }
  res.status = 1
  return ctx.body = res
})


export default download