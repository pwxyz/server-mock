
import { isArray, isObject } from 'lodash';

const transformRes = (obj: object, arg: object) => {
  let newObj = getNewObj(obj, arg)
  return newObj
}

const getNewObj = (obj, arg) => {
  if (!isObject(obj)) {
    return obj
  }
  let newObj = {}
  for (let key in obj) {
    let newKey = limitKey(key)
    let value = (newKey in arg) && arg[key] ? arg[newKey] : obj[key]
    let newValue = isArray(value) ? value.map(i => getNewObj(i, arg)) : isObject(value, arg) ? getNewObj(value, arg) : value
    newObj[newKey] = newValue
  }
  return newObj
}

const limitKey = (key: string) => key && key.split('|')[0]

export default transformRes
