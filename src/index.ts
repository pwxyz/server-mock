
import Koa from 'koa';
import cors from 'koa-cors';
// import cors from '@koa/cors'
import body from 'koa-body';
import dotenv from 'dotenv';
import path from 'path';
import router from './routers';
import statics from 'koa-static';
import catchErr from './middleware/catchErr'
import decryptToken from './middleware/decryptToken';
import transformQuery from './middleware/transformQuery';
import fss from 'fs-extra'
import schedule from 'node-schedule'
import getFileList from './utils/getFileList'
import { decrypt, encrypt } from './utils/secret'
import get from 'lodash/get'
import qs from 'qs'
import transformReq from './utils/transformReq'

dotenv.config();

require('./db');

const app = new Koa();
const port = process.env.PORT || 3364;

const scheduleCronstyle = () => {
  schedule.scheduleJob('30 1 * * * *', () => {
    // let url = getFileList(path.join(__dirname, '/uploads'))
    // url && url.length > 0 && url.map(i => fss.remove(i))
    fss.emptyDir(path.join(__dirname, '../uploads'))
    console.log('scheduleCronstyle:' + new Date());
  });
}

function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = "";
      ctx.req.on('data', (data) => {
        postdata += data
      })
      ctx.req.on("end", function () {
        resolve(postdata);
      })
    } catch (error) {
      reject(error);
    }
  });
}

app.use(cors());
app.use(catchErr)
app.use(decryptToken)
app.use(statics(path.join(__dirname, '../file')))

// app.use(async (ctx, next) => {
//   var data = await parsePostData(ctx);

//   console.log(data);
//   // ctx.body=data;
// })

app.use(body({
  multipart: true,
  includeUnparsed: true,
  formidable: {
    uploadDir: path.join(__dirname, '../uploads'),
    hash: 'md5',
    onFileBegin: function (name, file) {
      file.path += file.name;
    },
  },
}));

app.use(async (ctx, next) => {
  let isEncrypt = get(ctx, 'header.content-type').includes('/text')
  if (!isEncrypt) {
    return next()
  }
  ctx.state.isEncrypt = isEncrypt
  let method = ctx.method;
  let inQuery = ['GET', 'DELETE'].includes(method) ? true : false
  if (inQuery) {

    let str = ctx.request.search
    if (typeof str === 'string') {
      str = decodeURIComponent(str).replace(/^\?/, '')
      str = decrypt(decodeURIComponent(str))

      // ctx.state.query = transformReq(qs.parse(str))
      ctx.request.query = qs.parse(str)
    }

  }
  else {
    let data = await parsePostData(ctx);

    if (typeof data === 'string') {
      ctx.request.body = JSON.parse(decrypt(data))
    }
  }
  await next()
  if (isEncrypt) {
    ctx.body = encrypt(JSON.stringify(ctx.body))
  }
})
// app.use(body())
app.use(transformQuery);
app.use(router.routes());
app.use(router.allowedMethods());
scheduleCronstyle()

app.listen(port, () => { console.log(`this app is running on ${port}`) });