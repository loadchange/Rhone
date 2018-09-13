const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/topics' });
const { find, findById, create, update } = require('../controllers/topics');

const { secret } = require('../config');

const auth = jwt({ secret });

router.post('/', auth, create);

module.exports = router;
