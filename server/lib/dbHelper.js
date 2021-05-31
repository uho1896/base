const mysql = require('./mysql/db')
const {logMysql} = require('./log')

async function transaction(sqls, opts = {}) {
  const msg = `
    ${opts.foo} write to db ${opts.db || 'default'} with sqls >
    ${sqls.join('\n')}
  `;
  logMysql.info(msg);
  return mysql.transaction(sqls, opts);
}

async function query(sql, opts = {}) {
  const msg = `
    ${opts.foo} query db ${opts.db || 'default'} with sql > ${sql}
  `;
  logMysql.info(msg);
  return mysql.query(sql, opts)
}

module.exports = {
  transaction,
  query,
  escape: mysql.escape,
}