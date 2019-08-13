
import { getAsync, setAsync  } from '../redis';

export const getCache = async (key: string) => {
  let str: undefined|string = await getAsync(key);
  return JSON.parse(str);
};

export const setCache = async (key: string, arg: object|Array<string|object>|string|number|boolean, expire = 30) => {
  let str = await setAsync(key, JSON.stringify(arg), 'EX', expire);
  return str === 'OK';
};