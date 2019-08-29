import Koa from 'koa'
import logger from './logger.js'

const catchErr = async (ctx: Koa.Context, next: () => any) => {
  return next().catch((err: object) => {
    logger.error(err)
    let message = err && err['message'] || 'service error'
    ctx.body = {
      status: -1,
      message
    }
  })
}


export default catchErr