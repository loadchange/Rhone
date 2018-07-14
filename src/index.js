const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const routing = require('./routes');
const app = new Koa();

routing(app);
app.use(bodyparser());

app.listen(3000, () => console.log('start... \nhttp://localhost:3000'));
