
import checkLimitAndPage from '../checkLimitAndPage';

it('test checkLimitAndPage', () => {
  expect(checkLimitAndPage(10, 2).limit).toEqual(10);
  expect(checkLimitAndPage(10, 2).err).toEqual(null);
  expect(checkLimitAndPage(10, 2).page).toEqual(2);
  expect(checkLimitAndPage(10, 0).err).toEqual('limit或者page應該為整數且均大於一');
});