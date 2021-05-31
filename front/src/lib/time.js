const moment = require('moment')

class Time {
  constructor(opts = {}) {
    this.format = opts.format || 'YYYY-MM-DD HH:mm:ss';
    this.formatD = opts.formatD || 'YYYY-MM-DD';
  }

  updateFormat(format) {
    this.format = format || this.format;
    this.format = format || this.format;
  }

  formatTime(time = Date.now()) {
    return moment(time).format(this.format);
  }

  formatDay(time = Date.now(), offset = 0) {
    return moment(time).subtract(offset, 'days').format(this.formatD);
  }

  startOfDay(time = Date.now()) {
    return moment(time).startOf('day').format(this.format);
  }

  endOfDay(time = Date.now()) {
    return moment(time).endOf('day').format(this.format);
  }

  getDaysInRange(start, end) {
    end = end && moment(end).format('x') || Date.now();
    start = start && moment(start).format('x') || moment().subtract(7, 'days').format('x');
    let i =0;
    let ret = [];
    while (moment(end).subtract(i, 'days').format('x') >= start) {
      ret.push(moment(end).subtract(i, 'days').format(this.formatD))
      i++;
    }

    return ret;
  }
}

module.exports = new Time()