
import mockRes from '../mockRes';

it('test mockRes', () => {
  let obj =  {
    'status': {
      'type': 'integer',
      'description': '請求結果的狀態 1表示請求成功 負值表示其他失敗的情況',
      'enum': [
        1, -1
      ]
    },
    'message': {
      'type': 'string',
      'example': '錯誤信息',
      'description': '請求返回的status不為1時 該值為錯誤的信息內容'
    },
    'data': {
      'type': 'array',
      "items": {
        "type": "object",
        "properties": {
          "text": {
            "description": "",
            "example": "有新的版本信息，請前往升級",
            "type": "string"
          },
          "value": {
            "description": "",
            "example": "設備管理",
            "type": "string"
          }
        }
      }
    }
  };
  let objs =  {
    'status': {
      'type': 'integer',
      'description': '請求結果的狀態 1表示請求成功 負值表示其他失敗的情況',
      'enum': [
        1, -1
      ]
    },
    'message': {
      'type': 'string',
      'example': '錯誤信息',
      'description': '請求返回的status不為1時 該值為錯誤的信息內容'
    },
    'data': {
      'type': 'array',
      "items": {
        "type": "integer"
      }
    }
  };
  let arg = { };
  let limit = 10;

  expect(mockRes(obj, arg, limit)['status']).toEqual(1);
  expect(mockRes(obj, arg, limit)['data']['length']).toEqual(10);
  expect( typeof mockRes(obj, arg, limit )['data'][0]['text'] ).toEqual('string')
  expect( typeof mockRes(objs, arg, limit )['data'][0] ).toEqual('number')
});