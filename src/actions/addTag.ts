
import Tag from '../models/Tag';
import Project from '../models/Project';
import getArgAndCheck from '../utils/getArgAndCheck';
import { includes } from 'lodash';

const addTag = async (options: object) => {
  let result = {
    err: false,
    message: '',
    repeat: false,
    data: {}
  };
  let { obj, err } = getArgAndCheck(options, ['+blongTo', '+version', '+name', '+keys']);
  if (err) {
    result.err = true;
    result.message = err;
    return result;
  }
  else {
    let project = await Project.findById(obj['blongTo']);
    if (!project || (project && !includes(project['version'], obj['version']))) {
      result.err = true;
      result.message = `不存在该${project ? '版本' : '项目'}`;
      return result;
    }
    //查询是否重复
    let isRepeatTag = await Tag.find(obj);
    if (isRepeatTag.length !== 0) {
      result.err = true;
      result.message = '已有此tag';
      result.repeat = true;
      return result;
    }
    let tagObj = await Tag.create(obj);
    result.data = tagObj;
    result.message = '增加成功';
    return result;
  }
};

export default addTag;