

const copy = (obj: object):object|void => {
  let types = typeof obj
  if(types!=='object'){
    throw new Error(`copy 的参数类型需要为object, 但得到的${types}`)
  }
  else {
    return JSON.parse(JSON.stringify(obj))
  }
}

export default copy