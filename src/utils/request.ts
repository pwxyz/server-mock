

import axios from 'axios'
import qs from 'querystring'
import { isArray } from 'lodash';

interface Arg {
  method: 'get' | 'post' | 'delete' | 'put',
  url: string,
  data?: object,
  headers?: object
}

const qsArrToString = (obj: {}) => {
  let newObj = {}
  for (let key in obj) {
    if (isArray(obj[key])) {
      newObj[key] = String[obj[key]]
    }
    else {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

const request = async (arg: Arg) => {
  let url = arg.url
  let needQs = ['get', 'delete'].includes(arg.method)
  url += needQs && arg.data ? '?' + qs.stringify(qsArrToString(arg.data)) : ''
  let obj: Arg = {
    method: arg.method,
    url,
    headers: { 'access-token': String('this is token'), ...arg.headers }
  }
  if (!needQs) {
    obj.data = arg.data
  }
  let res = await axios.request(obj)
  if (res && res.status === 200) {
    if (res.data['status'] && res.data['status'] === 1) {
      return res.data
    }
    else {
      let err = res && res.data && res.data['message'] || '发生错误'
      console.error(err)
    }
  }
  else {
    let err = res && res.statusText
    console.error(err)
  }
}


export default request