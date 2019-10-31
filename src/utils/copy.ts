

const copy = (obj: object):object|void => {
  let types = typeof obj
  if(types!=='object'){
    throw new Error(`copy 的參數類型需要為object, 但得到的${types}`)
  }
  else {
    return JSON.parse(JSON.stringify(obj))
  }
}

export default copy