const Router = require('koa-router');
const router = new Router();
const { index, upload } = require('../controllers/home');

router.get('/', index);
router.post('/fileupload', upload);

module.exports = router;
