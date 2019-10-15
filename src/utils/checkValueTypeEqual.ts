
import { isArray } from 'lodash';

const checkValueTypeEqual = (value1, value2) => {
  let type1 = typeof value1
  let type2 = typeof value2
  if (type1 === type2) {
    if (type1 !== 'object') {
      return true
    }
    else return isArray(value1) === isArray(value2)
  }
  return false
}


export default checkValueTypeEqual