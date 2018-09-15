const Topic = require('../models/topics');

class TopicsCtl {
  async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      avatar_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false },
    });
    const topic = await new Topic(ctx.request.body).save();
    ctx.body = topic;
  }

  async find(ctx) {
    ctx.body = await Topic.find();
  }

  async findById(ctx) {
    const { fields = '' } = ctx.query;
    const selectFields = fields
      .split(';')
      .filter(f => f.trim())
      .map(f => ' +' + f)
      .join('');
    const topic = await Topic.findById(ctx.params.id).select(selectFields);
    ctx.body = topic;
  }
}

module.exports = new TopicsCtl();
