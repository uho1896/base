const routers = [
  require('./echo'),
];

function boot(app) {
  routers.forEach(r => r.boot(app));
}

module.exports = {
  boot,
}