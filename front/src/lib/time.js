const moment = require('moment')

class Time {
  constructor(opts = {}) {
    this.format = opts.format || 'YYYY-MM-DD HH:mm:ss';
  }

  updateFormat(format) {
    this.format = format || this.format;
  }

  formatTime(time) {
    return time ?
      moment(time).format(this.format) :
      moment().format(this.format);
  }
}

module.exports = new Time()