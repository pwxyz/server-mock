
import copy from '../copy';


it('copy object', () => {
  let obj = { a: 1, b: 2, c: { d: 5 }};
  let objs = copy(obj);
  expect(objs !== obj).toBe(true);
  expect(objs['a']).toEqual(1);
  expect(objs['c']['d']).toEqual(5);
});