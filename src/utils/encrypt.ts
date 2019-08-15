

import * as crypto from 'crypto'

const initKey = () => process.env.CRYPT_KEY || 'key'

const encrypt = (value:string, key=initKey()) => {
  const hash = crypto.createHmac('sha256', key).update(value).digest('hex')
  return hash
}

export default encrypt