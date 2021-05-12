async function randomGuard(req, res, next) {
  const i = Math.floor(Math.random() * 10) % 2;
  if (i) {
    throw new Error('randomGuard: cannot echo now');
  }

  req.random = Math.random();
  next();
}

module.exports = {
  randomGuard,
}