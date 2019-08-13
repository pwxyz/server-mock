
const unfoldPaths = (obj: object) => {
  let arr = [];
  for (let key in obj) {
    for (let keys in obj[key]) {
      let i = {};
      let newObj = obj[key][keys];
      i['path'] = key;
      i['method'] = keys;
      i['tag'] = newObj['tags'][0];
      i['description'] = newObj['description'];
      i['req'] = newObj['parameters'];
      i['res'] = newObj['responses']['200']['schema']['properties'];
      arr.push(i);
    }
  }
  return arr;
};

export default unfoldPaths;