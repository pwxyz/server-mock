

import transformRes from './../transformRes';


it('test transformRes', () => {
  let obj1 = {
    "name|": "bob",
    "age|年龄": 25,
    "data": [1, 2, 3],
    "data1": [{ "xx|f": 3 }, { "xxb|f": 5 }],
    "data2": [[{ "ff": 4 }]]
  }
  let obj2 = {}
  let obj3 = {
    age: 33
  }

  expect(transformRes(obj1, obj2)['age']).toBe(25)
  expect(transformRes(obj1, obj3)['age']).toBe(33)
  expect(transformRes(obj1, obj3)['data'][0]).toBe(1)
  expect(transformRes(obj1, obj3)['data1'][0]['xx']).toBe(3)
  expect(transformRes(obj1, obj3)['data1'][1]['xxb']).toBe(5)
  expect(transformRes(obj1, obj3)['data2'][0][0]['ff']).toBe(4)
})