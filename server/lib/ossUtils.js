const cfg = require('../../assets/config/oss')

function basename(path) {
  let items = (path || '').split('/');
  if (items.length < 1) {
    return '';
  } else {
    return items[items.length - 1];
  }
}

function dirname(path) {
  let items = (path || '').split('/');
  if (items.length <= 2) {
    return '/';
  } else {
    return items[items.length - 2];
  }
}

function fullDirname(path) {
  let items = (path || '').split('/');
  if (items.length <= 2) {
    return '/';
  } else {
    return items.slice(0, items.length - 1).join('/');
  }
}

function unifyName(name) {
  return (name || '').replace(/\/+/g, '/').replace(/\/$/, '');
}

function unifyDir(dir) {
  return `${dir}/`.replace(/\/+/g, '/');
}

function getOssPath(pth) {
  const fp = [
    cfg.root,
    ...pth,
  ];

  return unifyName(fp.join('/'));
}

function getOssDirectory(pth) {
  const fp = [
    cfg.root,
    ...pth,
  ];

  return unifyDir(fp.join('/'));
}

module.exports = {
  basename,
  dirname,
  fullDirname,
  unifyName,
  unifyDir,
  getOssPath,
  getOssDirectory,
}