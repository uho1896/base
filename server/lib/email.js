const nodemailer = require('nodemailer')
const {log} = require('./log')
const cfg = require('../../assets/config/app')

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  auth: {
      user: cfg.env.mailTransporter.user,
      pass: cfg.env.mailTransporter.pass,
  }
});

function send({to, subject, message}) {
  to = Array.isArray(to) ? to.join(',') : to;
  return transporter.sendMail({
    from: '"robot" <robot.mgtv@outlook.com>',
    to,
    subject: subject || `report`,
    text: message,
  }).catch(e => {
    log.error(`failed to send mail with ${e}`);
    return Promise.reject(e);
  });
}

function sendHtml({to, subject, message}) {
  to = Array.isArray(to) ? to.join(',') : to;
  return transporter.sendMail({
    from: '"robot" <robot.mgtv@outlook.com>',
    to,
    subject: subject || `report`,
    html: message,
    text: message,
  }).catch(e => {
    log.error(`failed to send mail with ${e}`);
    return Promise.reject(e);
  });
}

module.exports = {
  send,
  sendHtml,
};