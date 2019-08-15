
import * as Koa from 'koa';
import * as Cors from 'koa-cors';
import * as body from 'koa-body';
import * as dotenv from 'dotenv';
import cache from './middleware/cache';
import * as path from 'path';
import router from './routers';

import catchErr from './middleware/catchErr'
import decryptToken from './middleware/decryptToken';

dotenv.config();

require('./db');

const app = new Koa();
const port = process.env.PORT || 3364;

app.use(catchErr)
app.use(decryptToken)
app.use(Cors());
app.use(body({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '/uploads'),
    hash: 'md5',
    onFileBegin: function(name, file) {
      file.path += file.name;
    }
  }
}));
// app.use(body());
app.use(cache);
app.use(router.routes());
app.use(router.allowedMethods());


app.listen(port, () => { console.log(`this app is running on ${port}`) });