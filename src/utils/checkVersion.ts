
import { isUndefined } from 'lodash';

/**
 *
 * @param newVersion 'v0.0.1'
 * @param oldVersion 'v0.0.0'
 */
const checkVersion = (newVersion: string, oldVersion = 'v0.0.0'): boolean => {
  let canUse = true;
  if (!checkVersionType(newVersion) || newVersion === oldVersion) {
    canUse = false;
    return canUse;
  }
  // if (!oldVersion) {
  //   return checkVersionType(newVersion);
  // }
  let newVersionArr = getVersionArr(newVersion);
  let oldVersionArr = getVersionArr(oldVersion);
  for (let i = 0; i < newVersionArr.length; i++) {
    let newNum = tranUndefinedToNumber(newVersionArr[i]);
    let oldNum = tranUndefinedToNumber(oldVersionArr[i]);
    if (newNum < oldNum) {
      canUse = false;
      break;
    }
    else if (newNum > oldNum) {
      break;
    }
    else if (newNum === oldNum) {
      continue;
    }
  }
  return canUse;
};

const checkVersionType = (str: string) => /^v(\d+\.)*\d+$/.test(str);

const tranUndefinedToNumber = (arg: undefined|number): number => {
  let num = isUndefined(arg) ? -1 : arg;
  return num;
};

const getVersionArr = (version: string) => {
  let arr = version.replace('v', '').split('.').map(i => Number(i));
  return arr;
};

export default checkVersion;