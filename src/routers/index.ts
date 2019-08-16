
import Router from 'koa-router';
import getFileList from '../utils/getFileList';

const router = new Router();

const array = getFileList(__dirname).map(i => i.routes());

router.use('/', ...array);


export default router;