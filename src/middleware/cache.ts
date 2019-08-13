
// import { getCache, setCache } from '../utils/cache';
// import getArg from '../utils/getArg';
// import Cache from '../models/Cache';

const cache = async (ctx, next) => {
  let url = ctx.url;


  if (/mock\/.+\/.+/.test(url)) {

    // let customRes = await findCache({ projectId, method, version, path });
    // if (customRes) {
    //   ctx.body = customRes['res'];
    //   return;
    // }

    await next();


  }
  else {
    await next();
  }

};


export default cache;