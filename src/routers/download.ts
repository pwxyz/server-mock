
import Router from 'koa-router';
import getArgAndCheck from '../utils/getArgAndCheck';
import Api from './../models/Api';
import Project from './../models/Project';
import request from '../utils/request'
import createCommonRes from '../utils/createCommonRes';
import send from 'koa-send';
import getDocx from './../utils/docx';
import get from 'lodash/get'
import dayjs from 'dayjs'
import fss from 'fs-extra'

const download = new Router({ prefix: 'download' });


//下载docx格式文档
download.all('/:id', async ctx => {
  let res = createCommonRes()
  let id = ctx.params['id']
  if (!id) {
    res.message = 'id不存在';
    return ctx.body = res
  }
  let data = await Api.find({ belongTo: id }).populate('tag').sort('router')
  let nameArg = await Project.findById(id)
  let name = `${get(nameArg, 'name')}_${dayjs().format('YYYY-MM-DD_HH_mm_ss')}`.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\-_.]/g, '_')
  let url = await getDocx(data, name, get(nameArg, 'name'))
  setTimeout(() => {
    fss.remove(url)
  }, 20 * 60 * 1000)  //定时器  20分钟后删除文件 
  ctx.attachment(url);
  await send(ctx, url, { root: '/' })
  // res['payload'] = {
  //   url
  // }
  // res.status = 1
  // return ctx.body = res
})


export default download