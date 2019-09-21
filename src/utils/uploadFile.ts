
// 地址  https://chenshenhai.github.io/koa2-note/note/upload/simple.html
import  Busboy from 'busboy';
import { inspect } from 'util';
import  path from 'path';
import  fs from 'fs';


// const makdirSync = (diranme) => {
//   if (fs.existsSync(diranme)) {
//     return true;
//   }
//   else {
//     if (makdirSync(path.dirname(diranme))) {
//       fs.mkdirSync(diranme);
//       return true;
//     }
//   }
// };

const getSuffixName = (fileName: string) => {
  let nameList: string[] = fileName.split('.');
  return nameList[nameList.length - 1];
};

const uploadFile = (ctx, { pathName }) => {
  let req = ctx.req;
  let busboy = new Busboy({ headers: req.headers });

  return new Promise((resolve, reject) => {
    let result = {
      success: false,
      formData: {}
    };

    busboy.on('file', function(filedname, file, filename, encoding, mimeType) {
      console.log('開始', filedname, file, filename, encoding, mimeType);
      let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename);
      let _uploadFilePath = path.join(pathName, fileName);
      let saveTo = path.join(_uploadFilePath);

      file.pipe(fs.createWriteStream(saveTo));

      file.on('end', function() {
        result.success = true;
        result['message'] = '上傳成功';
        console.log('上傳成功');
        resolve(result);
      });

      file.on('error', function() {
        result.success = false;
        result['message'] = '上傳失敗';
        console.log('上傳失敗');
        reject(result);
      });

    });

    // 解析表單中其他字段信息
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('表單字段數據 [' + fieldname + ']: value: ' + inspect(val));
      result.formData[fieldname] = inspect(val);
    });

    // 解析結束事件
    busboy.on('finish', function() {
      console.log('文件上結束');
      resolve(result);
    });

    // 解析錯誤事件
    busboy.on('error', function() {
      console.log('文件上出錯');
      reject(result);
    });

    req.pipe(busboy);
  });
};

export default uploadFile;