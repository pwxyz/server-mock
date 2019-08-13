

import copy from './copy'

interface ReqItem {
  in: string
  name: string
  require: boolean
  type: string
  description: string 
  kind: string
}

interface ParametersItem {
  in: string
  name: string 
  required: boolean
  type: string
  description: string
}


const req2parameters = (arr:ReqItem[])=> {
  let array = copy(arr);
  if(array['length']){
    array['map'](i => {
      if(i.kind){
        delete i.kind
      }
      return i
    })
  }
  return array
}


export default req2parameters;