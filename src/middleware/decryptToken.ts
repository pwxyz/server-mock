
import { verifyJwt } from '../utils/jsonwebtoken'

const decryptToken = async (ctx, next) => {
  let url = ctx.url;
  if(!(/login/.test(url))){
    let token = ctx.headers['access-token']
    if(!token){
      return ctx.body = {
        status: -1,
        message: 'headers中缺少access-token'
      }
      
    }
    else {
      try{
        let obj = verifyJwt(token)
        if(obj){
          ctx.state = { ...ctx.state, ...obj }
        }
      }
      catch(err){
        console.log(err&&err.name , err&&err.message)
        return ctx.body={
          status:1,
          message: 'token不正確'
        }
      }
    }
  }
  return  next()
}

export default decryptToken;