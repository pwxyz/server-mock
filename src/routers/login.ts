
import * as Router from 'koa-router';


const login = new Router({ prefix: 'login' });


login.get('/', async ctx => {
  ctx.body = {
    code: 201,
    message: '密码成功',
    token: 'ggssd5246afa'
  };
});


export default login;