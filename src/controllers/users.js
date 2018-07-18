const db = [{ name: 'Steve jobs' }, { name: 'Obama' }];

class UsersCtl {
  find(ctx) {
    ctx.body = db;
  }

  findById(ctx) {
    const idx = ctx.params.id - 0;
    if (idx > db.length) {
      ctx.throw(412);
    }
    ctx.body = db[idx];
  }

  create(ctx) {
    db.push(ctx.request.body);
    ctx.body = ctx.request.body;
  }

  update(ctx) {
    db[ctx.params.id * 1] = ctx.request.body;
    ctx.body = ctx.request.body;
  }

  del(ctx) {
    db.splice(ctx.params.id * 1, 1);
    ctx.status = 204;
  }
}

module.exports = new UsersCtl();
