
import { isObject } from 'lodash';

const transformReq = (req: { [x: string]: string }) => {
  let newObj: { [x: string]: string | number | boolean } = {}
  if (!isObject(req)) {
    console.error('不是object')
    return req
  }
  for (let key in req) {
    newObj[key] = transform(req[key])
  }
  return newObj
}

const transform = (value: string) => {
  if (/\d/.test(value) && Number(value) === Number(value)) {
    return Number(value)
  }
  else if (value === 'true') {
    return true
  }
  else if (value === 'false') {
    return false
  }
  else if (value && value.includes && value.includes(',') && value.split(',').length > 1) {
    let arr = value.split(',')
    let newarr = arr.map(i => transform(i))
    return newarr
  }
  return value
}

export default transformReq