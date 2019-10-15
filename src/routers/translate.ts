
import Router from 'koa-router'
import Api from '../models/Api'
import cn from 'chinese-s2t'

const translate = new Router({ prefix: 'translate' })

translate.get('/:projectid', async ctx => {
  let arr = await Api.find({ belongTo: ctx.params.projectid })
  arr = JSON.parse(cn.s2t(JSON.stringify(arr)))
  // return ctx.body = {
  //   arr
  // }
  // let res = await arr.forEach(i => {
  //   let id = i._id
  //   let obj = { ...i }
  //   delete obj._id
  //   Api.findByIdAndUpdate(id, obj, { new: true })
  // })
  let res = []
  for (let i = 0; i < arr.length; i++) {
    let arg = arr[i]
    let id = arg._id
    let obj = { ...arg }
    delete obj._id
    let newObj = await Api.findByIdAndUpdate(id, obj, { new: true })
    res.push(newObj)
  }

  ctx.body = { arr, res }
})


export default translate