import Router from 'koa-router';

const ping = new Router({ prefix: 'ping' })

ping.get('/', async ctx => {
  ctx.body = 'pong'
})

export default ping
