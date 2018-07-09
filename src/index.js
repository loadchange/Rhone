const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const userRouter = new Router({ prefix: '/users' });

router.get('/', ctx => {
  ctx.body = 'home!';
});

userRouter.get('/', ctx => {
  ctx.body = [{ name: 'Steve jobs' }, { name: 'Obama' }];
});

userRouter.post('/', ctx => {
  ctx.body = { name: 'Lincoln' };
});

userRouter.get('/:id', ctx => {
  ctx.body = { name: 'Lincoln' };
});

userRouter.put('/:id', ctx => {
  ctx.body = { name: 'Lincoln' };
});

userRouter.delete('/:id', ctx => {
  ctx.status = 204;
});

app.use(router.routes());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.listen(3000);
