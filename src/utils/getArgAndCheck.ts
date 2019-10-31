
import getArg from './getArg';
import { isUndefined } from 'lodash';

/**
 * @ arr +字符串中有此符號的為必須包含的參數
 */

const isRequire = (str: string) => /^\+.+/.test(str);

const getArgAndCheck = (obj: object, arr: string[]) => {
  let result = {
    err: null,
    obj: {}
  };
  let arrs = [];
  let array = arr.map(i => {
    let isRequired = isRequire(i);
    let str = i.replace(/^\+/, '');
    if (isRequired) {
      arrs.push(str);
    }
    return str;
  });
  result.obj = getArg(obj, array);
  let arrays = arrs.filter(i => isUndefined(result.obj[i]));
  if (arrays.length !== 0) {
    result.err = `缺少必須的參數${arrays}`;
    result.obj = {};
  }

  return result;
};

export default getArgAndCheck;