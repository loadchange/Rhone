const fs = require('fs');
const path = require('path');
class HomeCtl {
  index(ctx) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(path.join(__dirname, '../public/views/index.html'));
  }
  upload(ctx) {
    const file = ctx.request.files.file;
    const basename = path.basename(file.path);
    ctx.body = { url: `${ctx.origin}/uploads/${basename}` };
  }
}

module.exports = new HomeCtl();
