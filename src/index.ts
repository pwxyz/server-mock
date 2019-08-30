
import Koa from 'koa';
import cors from 'koa-cors';
// import cors from '@koa/cors'
import body from 'koa-body';
import dotenv from 'dotenv';
import path from 'path';
import router from './routers';

import catchErr from './middleware/catchErr'
import decryptToken from './middleware/decryptToken';
import transformQuery from './middleware/transformQuery';

dotenv.config();

require('./db');

const app = new Koa();
const port = process.env.PORT || 3364;

app.use(cors());
app.use(catchErr)
app.use(decryptToken)
app.use(body({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '/uploads'),
    hash: 'md5',
    onFileBegin: function (name, file) {
      file.path += file.name;
    }
  }
}));
app.use(transformQuery);
app.use(router.routes());
app.use(router.allowedMethods());


app.listen(port, () => { console.log(`this app is running on ${port}`) });