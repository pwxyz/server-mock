import compareTwoObjTypeAndRequire from '../compareTwoObjTypeAndRequired'

it('test  compareTwoObjTypeAndRequire', () => {
  let obj1 = {
    "name": "sfg",
    "password": "afgh0",
    "age": 15,
    "data": [12, 3],
    "obj": { a: "12" }
  }
  let obj2 = {
    "name|名字": "52"
  }
  let obj3 = {
    "password": 14
  }
  let obj4 = {
    "age|52": 15
  }

  let obj5 = {
    "data|daf": {}
  }
  let obj6 = {
    "data": ["1"]
  }
  let obj7 = {
    "obj": {}
  }
  let obj8 = {
    "data": {},
    "obj": {}
  }
  //假为通过校验
  expect(compareTwoObjTypeAndRequire(obj1, obj2).err).toBeNull()
  expect(compareTwoObjTypeAndRequire(obj1, obj3).err).not.toBeNull()

  expect(compareTwoObjTypeAndRequire(obj1, obj3).err).toBeTruthy()  //为真
  expect(compareTwoObjTypeAndRequire(obj1, obj2).err).toBeFalsy()  //为假
  expect(compareTwoObjTypeAndRequire(obj1, obj4).err).toBeFalsy()
  expect(compareTwoObjTypeAndRequire(obj1, obj5).err).toBeTruthy()
  expect(compareTwoObjTypeAndRequire(obj1, obj6).err).toBeFalsy()
  expect(compareTwoObjTypeAndRequire(obj1, obj7).err).toBeFalsy()
  expect(compareTwoObjTypeAndRequire(obj1, obj8).err).toBeTruthy()
})