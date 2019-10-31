
/**
 * @ options swagger數據
 * @ res 返回數據為object
 * @ res.project 項目信息參考project模型
 * @ res.tags 參考tags模型
 * @ res.api object[] 數組類型，參考api模型
 *
 */

import { isObject, isArray } from 'lodash';

const transformSwagger = (options: object) => {

};

const getApis = (paths: object, definitions: object) => {
  let objs = {};
  for (let key in paths) {
    if (isObject(key)) {
      objs[key] = getApis(paths[key], definitions);
    }
    else if (isArray(key)) {
      objs[key] = paths[key].map(i => (isObject(i) ? getApis(paths[key], definitions) : i));
    }
    else if (key === '$ref') {
      let newKey = key.replace('#/definitions/', '');
      objs[key] = getApis(definitions[newKey], definitions);
    }
    else { objs[key] = paths[key] }
  }
  return objs;
};