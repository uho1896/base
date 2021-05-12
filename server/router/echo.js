const Helper = require('./helper')
const r = new Helper('/echo')
const {randomGuard} = require('./guard/echo')

r.use('/random', async (req, res) => {
  const i = Math.floor(Math.random() * 10) % 2;
  if (i) {
    throw new Error('cannot echo now');
  }

  return res.json({data: req.query.echo || i});
});

r.use('/guard', [randomGuard], async (req, res) => {
  const i = Math.floor(Math.random() * 10) % 2;
  if (i) {
    throw new Error('cannot echo now');
  }

  return res.json({data: req.random});
});

module.exports = r