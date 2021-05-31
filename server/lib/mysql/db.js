const mysql = require('mysql')

let pool = [];

function init(dbs) {
  close();

  dbs.forEach(db => {
    const client = mysql.createPool({
      host: db.host,
      port: db.port,
      user: db.user,
      password: db.password,
      database: db.database,
      connectionLimit: 1000,
      connectTimeout: 60 * 60 * 1000,
      acquireTimeout: 60 * 60 * 1000,
      timeout: 60 * 60 * 1000,
    });

    pool.push({
      name: db.name,
      database: db.database,
      client,
    });
  });

  return pool;
}

function close() {
  pool.forEach(p => {
    p.client.end();
  });

  pool = [];
  return;
}

async function query(sql, opts = {}) {
  let connection = opts.connection;
  if (!connection) {
    if (pool.length < 1) {
      throw new Error('query before init');
    }

    if (!opts.db) {
      connection = pool[0].client;
    } else {
      const dbPool = pool.find(p => p.name == opts.db);
      connection = dbPool && dbPool.client;
    }
  }

  if (!connection) {
    throw new Error('no available connection');
  }

  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    })
  });
}

async function transaction(sqls, opts = {}) {
  if (pool.length < 1) {
    throw new Error('query before init');
  }

  const dbPool = opts.db ? pool.find(p => p.name == opts.db) : pool[0];
  if (!dbPool || !dbPool.client) {
    throw new Error(`${opts.db} not found`);
  }

  const connection = await new Promise((resolve, reject) => {
    dbPool.client.getConnection((err, con) => {
      if (err) {
        return reject(err);
      }

      return resolve(con);
    });
  });

  await new Promise((resolve, reject) => {
    connection.beginTransaction(err => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });

  try {
    for (let i=0, l=sqls.length; i<l; i++) {
      await query(sqls[i], {db: opts.db, connection});
    }

    await new Promise((resolve, reject) => {
      connection.commit(errCommit => {
        if (errCommit) {
          return reject(errCommit);
        }

        return resolve();
      })
    });

    connection.release();
  } catch(e) {
    return new Promise((resolve, reject) => {
      connection.rollback(() => {
        connection.release();
        return reject(e);
      });
    });
  }
}

function escape(param) {
  return (pool.length > 0) ? pool[0].client.escape(param) : param;
}

module.exports = {
  init,
  close,
  query,
  transaction,
  escape,
}
