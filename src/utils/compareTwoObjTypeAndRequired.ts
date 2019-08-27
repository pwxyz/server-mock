
import checkValueTypeEqual from './checkValueTypeEqual';
/**
 @ obj 源object @arg 对照object  其key中有是否必须字段的判断 */
const compareTwoObjTypeAndRequire = (obj: object, arg: object) => {
  let errMsgArr: string[] = []
  // let newObj: object = {}
  for (let key in arg) {
    let isRequired = checkIsRequired(key)
    let newKey = key.split('|')[0].replace('?', '')
    if (isRequired) {
      if (!(newKey in obj)) {
        errMsgArr.push(`${newKey} 不存在`)
      }
      if (!checkValueTypeEqual(obj[newKey], arg[key])) {
        errMsgArr.push(`${newKey} 类型不正确`)
      }
    }
    if (obj[newKey] && !checkValueTypeEqual(obj[newKey], arg[key])) {
      errMsgArr.push(`${newKey} 类型不正确`)
    }

  }

  return { err: errMsgArr.length ? errMsgArr.join('、') : null, obj }
}




const checkIsRequired = key => !/\?$/.test(key)

export default compareTwoObjTypeAndRequire