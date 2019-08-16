

import * as axios from 'axios'

// let arg = {
//   url: 'http:172.31.50/sign',
//   method: 'post',
//   req: {
//     name:'admin',
//     pawword: '123456'
//   }
// }

// interface RequestArg  type arg

const request = async ({ url, method, req }) => {
  let res = await axios[method](url, req)
  return res&&res.data || {}
}

export default request