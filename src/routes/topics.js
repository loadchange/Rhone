const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/topics' });
const { find, findById, create, update, checkTopicExist, listFollowers } = require('../controllers/topics');

const { secret } = require('../config');

const auth = jwt({ secret });

router.post('/', auth, create);
router.get('/', find);
router.get('/:id', checkTopicExist, findById);
router.patch('/:id', auth, checkTopicExist, update);
router.get('/:id/followers', checkTopicExist, listFollowers);

module.exports = router;
