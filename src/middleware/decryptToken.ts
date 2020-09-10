
import { verifyJwt } from '../utils/jsonwebtoken'

const decryptToken = async (ctx, next) => {
  let url = ctx.url;
  // console.log(ctx)
  if (ctx.method === 'GET' || /(^\/mock.)|(^\/redirect.)/.test(url)) {
    //get请求不校验token
    return next()
  }
  if (!(/^\/login$/.test(url))) {
    let token = ctx.headers['access-token']
    if (!token) {
      return ctx.body = {
        status: -1,
        message: 'headers中缺少access-token'
      }

    }
    else {
      try {
        let obj = verifyJwt(token)
        if (obj) {
          ctx.state = { ...ctx.state, ...obj }
        }
      }
      catch (err) {
        console.log(err && err.name, err && err.message);
        // return ctx.res        
        return ctx.body = {
          status: -5,
          message: 'token不正确'
        }
      }
    }
  }
  return next()
}

export default decryptToken;