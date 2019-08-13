
import Project from '../models/Project';
import getArgAndCheck from '../utils/getArgAndCheck';
import checkVersion from '../utils/checkVersion';


//项目名有唯一性，不能重复，且前后不能有空格
const addProject = async (objs: object) => {
  let result = {
    err: false,
    message: '',
    data: {}
  };
  let { obj, err } = getArgAndCheck(objs, ['+title', 'description', 'version']);
  if (err) {
    result.err = true;
    result.message = err;
    return result;
  }
  else if (obj['version'] && !checkVersion(obj['version'])) {
    // throw new Error('version字段不符合格式');
    result.err = true;
    result.message = 'version字段不符合格式';
    return result;
  }
  else {
    let data = await Project.create(obj);
    let datas = await Project.find({ title: obj['title'] });
    if (datas.length >= 2) {
      await Project.findByIdAndRemove(data['_id']);
      result.err = true;
      result.message = 'title字段重复';
      return result;
    }
    result.message = '添加项目成功';
    result.data = data;
    return result;
  }
};

export default addProject;