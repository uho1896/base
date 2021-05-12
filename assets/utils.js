function isDev() {
  return process.env.aiEnv == 'dev';
}

function isLocal() {
  return process.env.aiEnv == 'local';
}

module.exports = {
  isDev,
  isLocal,
}