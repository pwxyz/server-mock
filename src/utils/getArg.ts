
import { isUndefined } from 'lodash';

const getArg = (obj: object, arr: string[]) => {
  let objs = {};
  arr.forEach(i => {
    if (!isUndefined(obj[i])) {
      objs[i] = obj[i];
    } });
  return objs;
};

export default getArg;