

const catchErr = async (ctx, next) => {
  return next().catch(err => {
    console.error('catchErr', JSON.stringify(err))
    let message = err&&err['message'] || 'service error'
    ctx.body = {
      status: -1,
      message
    }
  })
}


export default catchErr