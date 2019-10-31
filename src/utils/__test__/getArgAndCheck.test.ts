
import getArgAndCheck from '../getArgAndCheck';

it('test getArgAndCheck', () => {
  let obj = { name: 'name', password: 12345, isLogin: false, age: 0 };
  let arr1 = ['name', 'password'];
  let arr2 = ['+name', '+xpassword'];
  let arr3 = ['name', 'login', 'age'];
  let arr4 = ['name', '+login', 'age', '+xxdf'];

  expect(getArgAndCheck(obj, arr1).obj).toEqual({ name: 'name', password: 12345, });
  expect(getArgAndCheck(obj, arr2).err).toEqual(`缺少必須的參數xpassword`);
  expect(getArgAndCheck(obj, arr2).obj).toEqual({});
  expect(getArgAndCheck(obj, arr3).obj).toEqual({ name: 'name', age: 0, });
  expect(getArgAndCheck(obj, arr3).err).toEqual(null);
  expect(getArgAndCheck(obj, arr4).obj).toEqual({});
  expect(getArgAndCheck(obj, arr4).err).toEqual(`缺少必須的參數login,xxdf`);
});