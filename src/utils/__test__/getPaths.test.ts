import getPaths from '../getPaths';
import * as swagger from './testSwagger.json';

it('test getPaths', () => {
  let paths = swagger['paths'];
  let definitions = swagger['definitions'];
  let obj = getPaths(paths, definitions);
  let str = JSON.stringify(obj);


  expect(str.includes('$ref')).toEqual(false);
  expect(str.includes('definitions')).toEqual(false);
  expect(str.includes('#')).toEqual(false);
  expect(obj['/strategy/threatType']['get']['tags']).toEqual(['strategy']);
});