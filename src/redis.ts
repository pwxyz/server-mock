
//目前业务暂时不考虑使用redis
import * as redis from 'redis';
import { promisify } from 'util';

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;

export const client = redis.createClient(Number(redisPort), redisHost);

const promisiely = key => promisify(key).bind(client);

export const getAsync = promisiely(client.get);

export const setAsync = promisiely(client.set);

export const hmsetAsync = promisiely(client.HMSET);

export const hmgetAsync = promisiely(client.HMGET);