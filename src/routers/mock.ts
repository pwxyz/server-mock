
import * as Router from 'koa-router';
import Api from '../models/Api';
import Cache from '../models/Cache';
import mockRes from '../utils/mockRes';
import { isUndefined } from 'util';
import getArg from '../utils/getArg';
// import { getCache, setCache } from '../utils/cache';
import * as fs from 'fs';
import addProject from '../actions/addProject';
import addTag from '../actions/addTag';
import getPaths from '../utils/getPaths';
import unfoldPath from '../utils/unfoldPaths';
// import Tag from '../models/Tag';
import addApi from '../actions/addApi';
// import api from './api';

const mock = new Router({ prefix: 'mock' });

//检查必须包含的参数(body与header中的参数一起检查)
const checkArg = (arr1: object[], arr2: string[]) => {
  let newArr = arr1.filter(i => i['require'] && !arr2.includes(i['name'])).map(i => i['name']);
  return newArr;
};


const objToArr = (obj: object) => Object.keys(obj).filter(i => !isUndefined(i));

const getKey = (obj) => obj['projectId'] + obj['version'] + obj['path'] + obj['method'];

const delFile = path => fs.unlinkSync(path);

// mock.post('/config', async ctx => {

//   const obj = getArg(ctx.request.body, ['projectId', 'version', 'path', 'method', 'exprieIn', 'res']);
//   let key = getKey(obj);
//   await setCache(key, obj['res'], obj['exprieIn'] = 60);
//   ctx.body = {
//     status: 1,
//     message: '设置成功'
//   };
//   return;
// });

// mock.get('/cache', async ctx => {
//   // let data = await Cache.find().limit(100);
//   // ctx.body = {
//   //   code: 1,
//   //   message: '获取成功',
//   //   data
//   // };
//   let { projectId, version, path, method } = ctx.query;
//   console.log({ projectId, version, path, method });
//   let key = getKey({ projectId, version, path, method });
//   let data = await getCache(key);
//   ctx.body = {
//     code: 1,
//     message: '获取成功',
//     payload: data ? data : {}
//   };
// });

// mock.post('/cache', async ctx => {
//   const obj = getArg(ctx.request.body, ['projectId', 'version', 'path', 'method', 'exprieIn', 'res']);
//   let key = getKey(obj);
//   let isSet = await setCache(key, obj['res'], obj['exprieIn'] = 60);
//   let data = isSet ? await getCache(key) : {};
//   ctx.body = {
//     code: 1,
//     message: isSet ? '设置成功' : '设置失败',
//     data
//   };
// });

mock.get('/', async ctx => {
  ctx.body = {
    code: 401,
    message:'xxx'
  };
  return;
}
);

mock.put('/uploads', async ctx => {
  // const fields = ctx.request.body.fields; // this will be undefined for file uploads
  
  const files = ctx.request.files;
  console.log('xx', ctx.request.body)
  try {
    let path = files['file']['path'];
    let type = files['file']['type'];
    // if (type !== 'application/json') {
    //   ctx.body = {
    //     code: 402,
    //     message: '不是json格式'
    //   };
    //   delFile(path);
    //   return;
    // }
    let uploadData = fs.readFileSync(path, 'utf-8');
    uploadData = JSON.parse(uploadData);
    let projectObj = {
      title: uploadData['info']['title'],
      version: uploadData['info']['version'] || 'v0.0.1',
      description: uploadData['info']['description'] || ''
    };

    let { message, err, data } = await addProject(projectObj);
    if (err) {
      ctx.body = {
        code: 401,
        message
      };
      delFile(path);
      return;
    }
    let tagArg: object[] = uploadData['tags'].map(i => {
      let item = {};
      item['name'] = i['description'];
      item['keys'] = i['name'];
      item['blongTo'] = data['_id'];
      item['version'] = projectObj['version'];
      return item;
    });
    let newTagArr = await Promise.all(tagArg.map(i => addTag(i)));

    let obj = getPaths(uploadData['paths'], uploadData['definitions']);
    let arr = unfoldPath(obj);
    // console.log(arr.length);
    const getApiTag = (obj, name) => obj && obj['data'] && obj['data']['keys'] === name;

    arr.map(i => {
      i['blongTo'] = data['_id'];
      i['version'] = projectObj['version'];
      i['tag'] = newTagArr.filter(items => getApiTag(items, i['tag'])).map(item => {
        let obj = {};
        obj['name'] = item.data['name'];
        obj['keys'] = item.data['keys'];
        obj['id'] = item.data['_id'];
        return obj;
      })[0];

      return i;
    });
    let apiArr = [];
    for (let i = 0; i < arr.length; i++) {
      let item = await addApi(arr[i]);
      if (item.err) {
        apiArr.push(item);
      }
    }
    ctx.body = {
      code: 201,
      message: '成功',
      apiArr,
      arr,
      newTagArr,
      num: apiArr.length
    };
    delFile(path);
  }
  catch (err) {
    ctx.body = {
      code: 401,
      message: '出现错误'
    };
  }
});

mock.get('/test', async ctx => {
  let html = `<form  enctype="multipart/form-data" id='form' >
  <input type="file" id='file' />
  <button type="submit" id='submit' >提交</button>
</form>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
let submit = document.getElementById('submit')
submit.onclick = e => {
  e.preventDefault();
  let input = document.getElementById('file');
  let file = input.files[0]
  console.log(file)
  let data = new FormData();
  data.append('file',file )
  axios({ method: 'post', url: '/mock/uploads', data:data }).then(res =>console.log(res.data))
}
</script>`;
  ctx.body = html;


//   ctx.body = `
// <!doctype html>
// <html>
//   <body>
//     <form action="/mock/uploads" enctype="multipart/form-data" method="post">
//     <input type="text" name="username" placeholder="username"><br>
//     <input type="text" name="title" placeholder="title of file"><br>
//     <input type="file" name="uploads" multiple="multiple"><br>
//     <button type="submit">Upload</button>
//   </body>
// </html>`;
});


// mock.all('/:projectId/:version/:path\*', async ctx => {
//   let projectId = ctx.params['projectId'];
//   let version = ctx.params['version'];
//   let path: string = '/' + ctx.params['path'];
//   let method = ctx.method.toLowerCase();
//   let headerArg = ctx.header;
//   try {
//     let apiData = await Api.findOne({ blongTo: projectId, version, method, path });
//     // let apiData = await Api.findOne({ method, path });
//     let obj = { ...ctx.request.body, ...ctx.query };

//     let limit = Number(obj['limit']) || 1;
//     if (apiData) {
//       //检查必须的参数
//       console.log(obj);
//       let arr = [...objToArr(headerArg), ...objToArr(obj)];
//       let array = checkArg(apiData['req'], arr);
//       if (array.length === 0 || obj['apimock'] === 'true') {
//         let key = getKey({ projectId, version, path, method });
//         let haveCache = await getCache(key);
//         let res = haveCache ? haveCache : mockRes(apiData['res'], obj, limit);
//         ctx.body = res;
//         Cache.create({ projectId, version, path, res, method });
//       }
//       else {
//         ctx.body = {
//           status: -1,
//           message: `缺少必要的参数${array}`
//         };
//       }
//     }
//     else {
//       ctx.body = {
//         status: -1,
//         message: '当前api不存在'
//       };
//     }
//   }
//   catch (err) {
//     ctx.body = {
//       status: -1,
//       message: '当前api不存在',
//       err
//     };
//     return;
//   }
// });

export default mock;