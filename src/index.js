const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const routing = require('./routes');
const app = new Koa();

app.use(bodyparser());
parameter(app);
app.use(
  error({
    postFormat: (e, { stack, ...rest }) => (process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }),
  })
);
routing(app);

app.listen(3000, () => console.log('start... \nhttp://localhost:3000'));
