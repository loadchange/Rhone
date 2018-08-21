const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const mongoose = require('mongoose');
const routing = require('./routes');
const { connectionStr } = require('./config');
const app = new Koa();

mongoose.connect(connectionStr, { useNewUrlParser: true }, () => console.log('MongoDB Connection successful!'));
mongoose.connection.on('error', console.error);

app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, '/public/uploads'),
      keepExtensions: true,
    },
  })
);
parameter(app);
app.use(
  error({
    postFormat: (e, { stack, ...rest }) => (process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }),
  })
);
routing(app);

app.listen(3000, () => console.log('start... \nhttp://localhost:3000'));
