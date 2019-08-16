

const createCommonRes = (obj={}) => {
  let res = {
    status: -1,
    message: 'service error'
  }
  if('payload' in obj){
    res.status = 1
  }
  return { ...res, ...obj }
}

export default createCommonRes