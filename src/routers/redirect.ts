
import Router from 'koa-router';
import axios from 'axios'
import https from 'https'

const api = new Router({ prefix: 'redirect' })

api.all('/:protocl/:url*', async ctx => {
  // let url = 'https://172.31.50.236/user/verification-code'

  // let res = await axios({ url, httpsAgent },)

  let url = ctx.url.replace(/^\/redirect\//, '').replace(/\//, '://')
  let headers = ctx.headers
  let data = ctx.request.body
  let method = ctx.method
  let methodArr = ['GET', 'DELETE']
  let obj: any = {
    headers,
    url,
    method,
  }
  if (!methodArr.includes(method)) {
    obj['data'] = data
  }
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });
  let res = await axios({ ...obj, httpsAgent },)
  return ctx.body = res && res.data
})


export default api