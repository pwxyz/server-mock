import Koa from 'koa'
import logger from './logger.js'

const catchErr = async (ctx: Koa.Context, next: () => any) => {
  console.log(new Date(), 'req', ctx.url, ctx.method)
  // return next().catch((err: object) => {
  //   logger.error(err)
  //   let message = err && err['message'] || 'service error'
  //   ctx.body = {
  //     status: -1,
  //     message
  //   }
  // })
  await next().catch((err: object) => {
    logger.error(err)
    let message = err && err['message'] || 'service error'
    ctx.body = {
      status: -1,
      message
    }
  })
  console.log(new Date(), 'res', ctx.url, ctx.method)
}


export default catchErr