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
}

module.exports = new TopicsCtl();
