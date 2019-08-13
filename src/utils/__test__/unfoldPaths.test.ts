
import unfoldPaths from '../unfoldPaths';

it('test unfoldPaths', () => {
  let obj = {
    '/login': {
      'get': {
        'tags': [
          'strategy'
        ],
        'summary': '获取威胁类型（攻击行为）',
        'description': '获取威胁类型（攻击行为）',
        'consumes': [
          'application/json'
        ],
        'produces': [
          'application/json'
        ],
        'parameters': [
          {
            'in': 'header',
            'name': 'access-token',
            'type': 'string',
            'description': '用户验证用户请求权限的密令',
            'required': true
          }
        ],
        'responses': {
          '200': {
            'description': 'OK',
            'schema': {
              'type': 'object',
              'properties': {
                'status': {
                  '$ref': '#/definitions/status'
                },
                'message': {
                  '$ref': '#/definitions/message'
                },
                'payload': {
                  'type': 'object',
                  'properties': {
                    'data': {
                      'type': 'array',
                      'items': {
                        '$ref': '#/definitions/threatTypeItem'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  let objArg = unfoldPaths(obj)[0];
  expect(objArg.path).toEqual('/login');
  expect(objArg.method).toEqual('get');
  expect(objArg.tag).toEqual('strategy');
  expect(objArg.description).toEqual('获取威胁类型（攻击行为）');
  expect(objArg.req).toEqual([
    {
      'in': 'header',
      'name': 'access-token',
      'type': 'string',
      'description': '用户验证用户请求权限的密令',
      'required': true
    }
  ]);
  expect(objArg.res).toEqual(
    {
      'status': {
        '$ref': '#/definitions/status'
      },
      'message': {
        '$ref': '#/definitions/message'
      },
      'payload': {
        'type': 'object',
        'properties': {
          'data': {
            'type': 'array',
            'items': {
              '$ref': '#/definitions/threatTypeItem'
            }
          }
        }
      }
    }
  );
});