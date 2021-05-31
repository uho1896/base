function isDev() {
  return process.env.aiEnv == 'dev' || process.env.NODE_ENV == 'development';
}

function isLocal() {
  return process.env.aiEnv == 'local' || process.env.NODE_ENV == 'development';
}

module.exports = {
  isDev,
  isLocal,
}