

import jwt from 'jsonwebtoken';

const tokenKey = () => process.env.TOKEN_KEY || ''

const overTime = () => process.env.TOKEN_EXPIRES_IN || ''

const signJwt = (data: object, expiresIn = overTime(), key = tokenKey()) => {
  let token = jwt.sign(data, key, { expiresIn });
  return token
}

const verifyJwt = (token: string, key = tokenKey()): Object => {
  let obj = jwt.verify(token, key)
  return obj
}


export { verifyJwt, signJwt }