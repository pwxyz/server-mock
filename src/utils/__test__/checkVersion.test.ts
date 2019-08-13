
import checkVersion from '../checkVersion';

it('测试checkVersion', () => {
  let str1 = 'v0.0.1';
  let str2 = 'v0.01.0.0.01';
  let str3 = 'v1.2.3.4.5.6';
  let str4 = '0.0.0.1';
  expect(checkVersion(str1)).toBe(true);
  expect(checkVersion(str2)).toBe(true);
  expect(checkVersion(str1, str2)).toBe(false);
  expect(checkVersion(str3, str1)).toBe(true);
  expect(checkVersion(str4)).toBe(false);
  expect(checkVersion(str1, str1)).toBe(false);
});