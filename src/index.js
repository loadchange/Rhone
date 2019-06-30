const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  console.log(1);
  await next();
  console.log(2);
  ctx.body = 'hello koa!   1 3 5 4 2';
});

app.use(async (ctx, next) => {
  console.log(3);
  await next();
  console.log(4);
});

app.use(ctx => {
  console.log(5);
});

app.listen(3000);
