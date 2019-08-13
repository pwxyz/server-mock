
import Api from '../models/Api';
import getArgAndCheck from '../utils/getArgAndCheck';

const addApi = async (options: object) => {
  let result = {
    err: false,
    message: '',
    data: {}
  };
  let { obj, err } = getArgAndCheck(options, ['+res', '+path', '+version', '+method', '+tag', '+req', '+blongTo']);
  if (err) {
    result.err = true;
    result.message = err;
    return result;
  }
  let duplicateCheck = await Api.find({ blongTo: obj['blongTo'], version: obj['version'], method: obj['method'], path: obj['path'] });
  if (duplicateCheck.length) {
    result.err = true;
    result.message = '当前api方法、版本、路径重复，请修改后再试';
    return result;
  }
  else {
    let datas = await Api.create(obj);
    result.message = datas ? '增加成功' : '增加失败';
    result.err = datas ? true : false;
    result.data = datas;
    return result;
  }
};


export default addApi;