
import { isObject, isArray } from 'lodash';

const getPaths = (paths, definitions) => {
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

const transFrom = (arg, definitions: object, key?: string) => {
  return isArray(arg) ? transformArray(arg, definitions) :
    isObject(arg) ? transformObject(arg, definitions, key) :
    transformString(arg, definitions);
};

const transformArray = (arr: any[], definitions: object) => arr.map(i => (isObject(i) ? getPaths(i, definitions) : i));

const transformObject = (obj: object, definitions: object, key: string) => {
  let newKey = key;
  let arrKey = Object.keys(obj);
  let needDef = arrKey.includes('$ref') && arrKey.length === 1;
  if (needDef) {
    newKey = obj['$ref'].replace('#/definitions/', '');
  }
  let objs = needDef ? definitions[newKey] : obj;
  return getPaths(objs, definitions);
};

const transformString = (str: string, definitions: object) => {
  let needTransform = typeof str === 'string' && /\#\/definitions/.test(str);
  let newKey = needTransform ? str.replace('#/definitions/', '') : '';
  let objs = needTransform ? getPaths(definitions[newKey], definitions) : str;
  return objs;
};


export default getPaths;