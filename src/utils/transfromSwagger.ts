
/**
 * @ options swagger数据
 * @ res 返回数据为object
 * @ res.project 项目信息参考project模型
 * @ res.tags 参考tags模型
 * @ res.api object[] 数组类型，参考api模型
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