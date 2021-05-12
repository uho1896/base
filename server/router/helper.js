const express = require('express')
const {log} = require('../lib/log')

class Helper {
  constructor(root) {
    this.root = root;
    this.router = express.Router();
  }

  boot(app) {
    app.use(this.root, this.router);
  }

  wrapper(handle) {
    return async (req, res, next) => {
      try {
        await handle(req, res, next);
      } catch(e) {
        const error = e && e.message || e || 'something wrong';
        log.error(error);
        return res.status(555).send({error});
      }
    }
  }

  use(uri, guards, handle) {
    guards = Array.isArray(guards) ? guards : [guards];
    handle && guards.push(handle);
    guards = guards.map(g => this.wrapper(g));
    this.router.use(uri, guards);
  }
}

module.exports = Helper