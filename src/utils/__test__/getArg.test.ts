
import getArg from '../getArg';

it('test getArg', () => {
  let obj = { name: 'xxoo', password: '123456', age: 0, isHave: false };
  let arr1 = ['name', 'password'];
  let arr2 = ['names', 'name', 'age', 'ages'];
  let arr3 = ['ishave', 'password'];

  expect(getArg(obj, arr1)).toEqual({ name: 'xxoo', password: '123456' });
  expect(getArg(obj, arr2)).toEqual({ name: 'xxoo', age: 0 });
  expect(getArg(obj, arr3)).toEqual({ password: '123456' });
});