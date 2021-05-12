const utils = require('../utils')

let cfg = {
  root: 'ai_prod',
}

if (utils.isDev() || utils.isLocal()) {
  cfg = {
    root: 'ai_dev',
  }
}

module.exports = cfg