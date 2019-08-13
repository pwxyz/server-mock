
import * as mockjs from 'mockjs';
import { isUndefined } from 'lodash';

const Random = mockjs.Random;

const mockFn = key => {
  try {
    if (key === 'integer') {
      return Random[key](0, 10000);
    }
    return Random[key]();
  }
  catch (err) {
    return Random['string']();
  }
};

const otherArr = ['object', 'array'];


const mockRes = (obj: object, arg: object, limit?: number) => {
  let newObj = {};
  for (let key in obj) {
    if (!otherArr.includes(obj[key]['type'])) {
      newObj[key] = translateArg(obj[key], key, arg);
    }
    else if (obj[key]['type'] === 'object') {
      newObj[key] = mockRes(obj[key]['properties'], arg, limit);
    }
    else {
      // newObj[key] = [mockRes(obj[key]['items'], limit)];
      // let num = /data/.test(key) && obj[key]['type'] === 'array' ? limit : 10;
      let num = 6;
      // newObj[key] = [...Array(num)].map(i => mockRes(getItemsArg(obj[key]['items']), arg, limit));
      newObj[key] = [...Array(num)].map(i => {
        let itemType =  obj[key]['items']['type'];
        if (itemType === 'object') {
          return mockRes(obj[key]['items']['properties'], arg, limit);
        }
        else { return translateArg(obj[key]['items'], key, arg) }
      }
      );
    }
  }
  return newObj;
};
//随机生成近一年的时间戳，毫秒数
const getTime = () => {
  let random = Random.integer(0, 3600 * 1000 * 24 * 365);
  return Number(new Date()) - random;
};

const translateArg = (obj: object, key: string, arg: object) => {
  if (!isUndefined(arg[key]) && arg[key] !== '') {
    return arg[key];
  }
  if (key === 'status') {
    return 1;
  }
  else if (key === 'role') {
    return 1;
  }
  else if (key === 'total') {
    return Random.integer(40, 100);
  }
  else {
    let kind = obj['kind'] ? obj['kind'] : obj['type'] ? obj['type'] : 'string';
    if (kind === 'date') {
      return getTime();
    }
    else {
      let value = mockFn(kind);
      return value;
    }
  }
};



export default mockRes;