

const catchErr = async (ctx, next) => {
  return next().catch(err => {
    console.error(JSON.stringify(err))
    ctx.body = {
      status: -1,
      message: 'service error'
    }
  })
}


export default catchErr