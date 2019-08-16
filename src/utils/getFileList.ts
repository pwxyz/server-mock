
import  fs from 'fs';

const getFileList = (path: fs.PathLike) => {
  const arr = fs.readdirSync(path).filter(i => !i.includes('index') && !/.map$/.test(i));
  const array = arr.map(i => require(`${path}/${i}`).default).filter(i => i);
  return array;
};

export default getFileList;