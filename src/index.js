const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const userRouter = new Router({ prefix: '/users' });

const auth = async (ctx, next) => {
  console.log(ctx.url);
  if (ctx.url !== '/users') {
    ctx.throw(401);
  }
  next();
};

router.get('/', ctx => {
  ctx.body = 'home!';
});

userRouter.get('/', auth, ctx => {
  ctx.body = 'user list';
});

userRouter.post('/', auth, ctx => {
  ctx.body = 'create user';
});

userRouter.get('/:id', auth, ctx => {
  ctx.body = `query user by id = ${ctx.params.id}`;
});

app.use(router.routes());
app.use(userRouter.routes());

app.listen(3000);
