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
    ctx.verifyParams({
      name: { type: 'string', required: true },
      age: { type: 'number', required: false },
    });
    db.push(ctx.request.body);
    ctx.body = ctx.request.body;
  }

  update(ctx) {
    if (ctx.params.id * 1 >= db.length) {
      ctx.throw(412);
    }
    ctx.verifyParams({
      name: { type: 'string', required: true },
      age: { type: 'number', required: false },
    });
    db[ctx.params.id * 1] = ctx.request.body;
    ctx.body = ctx.request.body;
  }

  del(ctx) {
    db.splice(ctx.params.id * 1, 1);
    ctx.status = 204;
  }
}

module.exports = new UsersCtl();
