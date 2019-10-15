
import checkValueTypeEqual from '../checkValueTypeEqual'

it('test checkValueTypeEqual', () => {
  let v1 = 1
  let v2 = 2
  let v3 = '1'
  let v4 = 'sfg'
  let v5 = { 'a': 4 }
  let v6 = {}
  let v7 = []
  let v8 = [{}]

  expect(checkValueTypeEqual(v1, v2)).toBe(true)
  expect(checkValueTypeEqual(v1, v3)).toBe(false)
  expect(checkValueTypeEqual(v3, v4)).toBe(true)
  expect(checkValueTypeEqual(v5, v6)).toBe(true)
  expect(checkValueTypeEqual(v7, v8)).toBe(true)
})