
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

app.use(cors());
app.use(catchErr)
app.use(decryptToken)
app.use(statics(path.join(__dirname, '../file')))
app.use(body({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '../uploads'),
    hash: 'md5',
    onFileBegin: function (name, file) {
      file.path += file.name;
    }
  }
}));
// app.use(body())
app.use(transformQuery);
app.use(router.routes());
app.use(router.allowedMethods());
scheduleCronstyle()

app.listen(port, () => { console.log(`this app is running on ${port}`) });