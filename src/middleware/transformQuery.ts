
import transformReq from './../utils/transformReq';


const transformQuery = async (ctx, next) => {


  if (ctx.request.query) {
    let obj = transformReq(ctx.request.query)
    // ctx.request.query = obj
    ctx.state = { ...ctx.state, query: obj }
    return next()
  }

  else return next()
}

export default transformQuery
