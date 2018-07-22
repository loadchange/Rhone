const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const error = require('koa-json-error');
const routing = require('./routes');
const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || err.statusCode || 500;
    const { message } = err;
    ctx.body = { message };
  }
});

app.use(bodyparser());
app.use(
  error({
    postFormat: (e, { stack, ...rest }) => (process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }),
  })
);
routing(app);

app.listen(3000, () => console.log('start... \nhttp://localhost:3000'));
