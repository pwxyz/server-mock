

import req2parameters from '../req2parameters';

test('req2parameters', () => {
  let arr = [{
    in: 'header',
    name: 'admin',
    require: true,
    type: 'string',
    description: '姓名', 
    kind: 'name'
  }]
  let array = [{
    in: 'header',
    name: 'admin',
    require: true,
    type: 'string',
    description: '姓名'
  }]
  expect( req2parameters(arr) ).toEqual(array)
  expect( req2parameters([]) ).toEqual([])
})