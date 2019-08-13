
// import { isObject, isArray } from 'lodash';
const { isObject, isArray } = require('lodash');
const fs = require('fs');
const swagger = require('./attack.json');

const getApis = (paths, definitions) => {
  if (isArray(paths)) {
    let array = JSON.parse(JSON.stringify(paths)).map(i => transFrom(i, definitions));
    return array;
  }
  else {
    let objs = {};
    for (let key in paths) {
      if (key === '$ref') {
        objs = transFrom(paths[key], definitions, key);
      }
      else {
        objs[key] = transFrom(paths[key], definitions, key);
      }

    }
    return objs;
  }

};

const transFrom = (arg, definitions, key) => {
  return isArray(arg) ? transformArray(arg, definitions) :
    isObject(arg) ? transformObject(arg, definitions, key) :
    transformOther(arg, definitions);
};

const transformArray = (arr, definitions) => arr.map(i => (isObject(i) ? getApis(i, definitions) : i));

const transformObject = (obj, definitions, key) => {
  let newKey = key;
  let arrKey = Object.keys(obj);
  let needDef = arrKey.includes('$ref') && arrKey.length === 1;
  if (needDef) {
    newKey = obj['$ref'].replace('#/definitions/', '');
  }
  let objs = needDef ? definitions[newKey] : obj;
  return getApis(objs, definitions);
};

const transformOther = (str, definitions) => {
  let needTransform = typeof str === 'string' && /\#\/definitions/.test(str);
  let newKey = needTransform ? str.replace('#/definitions/', '') : '';
  let objs = needTransform ? getApis(definitions[newKey], definitions) : str;
  return objs;
};

let obj = getApis(swagger.paths, swagger.definitions);
let str = JSON.stringify(obj, null, 2);
fs.writeFileSync('xxtst.json', str);

// export default getApis;