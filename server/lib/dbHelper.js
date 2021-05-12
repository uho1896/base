const mysql = require('./mysql/db')
const {logMysql} = require('./log')

async function transaction(sqls, opts = {}) {
  logMysql.info(`
    ${opts.foo} to db ${opts.db || 'default'} with
    ${sqls.join('\n')}
  `);

  return mysql.transaction(sqls, opts);
}

module.exports = {
  transaction,
}