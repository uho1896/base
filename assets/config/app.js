const utils = require('../utils')

let cfg = {
  env: require('../../env/env.json'),
  port: process.env.AI_SERVER_PORT || 3551,
  jwtSecret: 'ai_&^$$@#)*TY%FG_prod',
  token: 'ai_prod_token',
}

if (utils.isDev() || utils.isLocal()) {
  cfg = {
    env: require('../../env/dev.env.json'),
    port: process.env.AI_SERVER_PORT || 3553,
    jwtSecret: 'ai_&^$$@#)HUJFJK_test',
    token: 'ai_dev_token',
  }
}

module.exports = cfg
