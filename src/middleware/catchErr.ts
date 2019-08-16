import Koa from 'koa'

const catchErr = async (ctx: Koa.Context , next: () => any) => {
  return next().catch((err: object ) => {
    console.error('catchErr', JSON.stringify(err))
    let message = err&&err['message'] || 'service error'
    ctx.body = {
      status: -1,
      message
    }
  })
}


export default catchErr