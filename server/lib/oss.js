const Core = require('@alicloud/pop-core')
const OSS = require('ali-oss')
const bluebird = require('bluebird')
const {log} = require('./log')
const ossUtils = require('./ossUtils')
const fs = require('fs')
const cfg = require('../../assets/config/oss')
const uuid = require('uuid')

const ossClient = new OSS({
  accessKeyId: cfg.env.accessKeyId,
  accessKeySecret: cfg.env.accessKeySecret,
  bucket: cfg.env.bucket,
  region: cfg.env.region,
  timeout: 36000,
});
const client = new Core({
  accessKeyId: cfg.env.accessKeyId,
  accessKeySecret: cfg.env.accessKeySecret,
  endpoint: cfg.env.endpoint,
  apiVersion: cfg.env.apiVersion,
});
const requestOption = {
  method: 'POST'
};
const ossRootPath = cfg.env.rootPath;

function getToken({userId, roPath} = {}) {
  if (!roPath) {
    return Promise.reject({message: 'getToken should specify read path'});
  }

  const policy = {
    'Version': '1',
    'Statement': [
      {
        'Effect': 'Allow',
        'Action': [
          'oss:ListBuckets',
          'oss:ListObjects'
        ],
        'Resource': [
          ossUtils.unifyName(ossRootPath),
          ossUtils.unifyName(`${ossRootPath}/*`),
        ]
      },
      {
        'Effect': 'Allow',
        'Action': [
          'oss:GetObject',
          'oss:ListObjects'
        ],
        'Resource': [
          ossUtils.unifyName(`${ossRootPath}/${roPath}`),
          ossUtils.unifyName(`${ossRootPath}/${roPath}/*`),
        ]
      }
    ]
  };

  const params = {
    'RegionId': cfg.env.regionId,
    'RoleArn': cfg.env.roleArn,
    'RoleSessionName': uuid.v4(),
    'Policy': JSON.stringify(policy)
  }

  log.info(`getToken for ${userId}, ${roPath}`);
  return client.request('AssumeRole', params, requestOption).then((result) => {
    let data = result && result.Credentials;
    if (!data) {
      return Promise.reject({message: 'invalid token data'});
    }

    return Promise.resolve({
      ...data,
      region: cfg.env.region,
      bucket: cfg.env.bucket,
    });
  });
}

function getTokenHP() {
  const policy = {
    'Version': '1',
    'Statement': [
      {
        'Effect': 'Allow',
        'Action': [
          'oss:ListBuckets',
          'oss:ListObjects'
        ],
        'Resource': [
          ossUtils.unifyName(ossRootPath),
          ossUtils.unifyName(`${ossRootPath}/*`),
        ]
      },
      {
        'Effect': 'Allow',
        'Action': [
          'oss:GetObject',
          'oss:ListObjects'
        ],
        'Resource': [
          ossUtils.unifyName(ossRootPath),
          ossUtils.unifyName(`${ossRootPath}/*`),
        ]
      }
    ]
  };

  const params = {
    'RegionId': cfg.env.regionId,
    'RoleArn': cfg.env.roleArn,
    'RoleSessionName': uuid.v4(),
    'Policy': JSON.stringify(policy)
  }

  log.info(`getTokenHP`);
  return client.request('AssumeRole', params, requestOption).then((result) => {
    let data = result && result.Credentials;
    if (!data) {
      return Promise.reject({message: 'invalid token data'});
    }

    return Promise.resolve({
      ...data,
      region: cfg.env.region,
      bucket: cfg.env.bucket,
    });
  });
}

function putToken({userId, woPath} = {}) {
  if (!woPath) {
    return Promise.reject({message: 'putToken should specify write path'});
  }

  const policy = {
    'Version': '1',
    'Statement': [
      {
        'Effect': 'Allow',
        'Action': [
          'oss:ListBuckets',
          'oss:ListObjects'
        ],
        'Resource': [
          ossUtils.unifyName(ossRootPath),
          ossUtils.unifyName(`${ossRootPath}/*`),
        ]
      },
      {
        'Effect': 'Allow',
        'Action': [
          'oss:PutObject',
          'oss:GetObject',
          'oss:ListObjects'
        ],
        'Resource': [
          ossUtils.unifyName(`${ossRootPath}/${woPath}`),
          ossUtils.unifyName(`${ossRootPath}/${woPath}/*`),
        ]
      }
    ]
  };

  const params = {
    'RegionId': cfg.env.regionId,
    'RoleArn': cfg.env.roleArn,
    'RoleSessionName': `${woPath}${Date.now()}`.replace(/\W/g, ''),
    'Policy': JSON.stringify(policy)
  }

  log.info(`putToken for ${userId}, ${woPath}`);
  return client.request('AssumeRole', params, requestOption).then((result) => {
    let data = result && result.Credentials;
    if (!data) {
      return Promise.reject({message: 'invalid token data'});
    }

    return Promise.resolve({
      ...data,
      region: cfg.env.region,
      bucket: cfg.env.bucket,
    });
  });
};

function putTokenHP() {
  const policy = {
    'Version': '1',
    'Statement': [
      {
        'Effect': 'Allow',
        'Action': [
          'oss:ListBuckets',
          'oss:ListObjects'
        ],
        'Resource': [
          ossUtils.unifyName(ossRootPath),
          ossUtils.unifyName(`${ossRootPath}/*`),
        ]
      },
      {
        'Effect': 'Allow',
        'Action': [
          'oss:PutObject',
          'oss:GetObject',
          'oss:DeleteObject',
          'oss:ListObjects'
        ],
        'Resource': [
          ossUtils.unifyName(ossRootPath),
          ossUtils.unifyName(`${ossRootPath}/*`),
        ],
      },
    ]
  };

  const params = {
    'RegionId': cfg.env.regionId,
    'RoleArn': cfg.env.roleArn,
    'RoleSessionName': `${Date.now()}`.replace(/\W/g, ''),
    'Policy': JSON.stringify(policy)
  }

  log.info(`putTokenHP`);
  return client.request('AssumeRole', params, requestOption).then((result) => {
    let data = result && result.Credentials;
    if (!data) {
      return Promise.reject({message: 'invalid token data'});
    }

    return Promise.resolve({
      ...data,
      region: cfg.env.region,
      bucket: cfg.env.bucket,
    });
  });
};

function putTokenPublic() {
  const policy = {
    'Version': '1',
    'Statement': [
      {
        'Effect': 'Allow',
        'Action': [
          'oss:ListBuckets',
          'oss:ListObjects'
        ],
        'Resource': [
          ossUtils.unifyName(ossRootPath),
          ossUtils.unifyName(`${ossRootPath}/*`),
        ]
      },
      {
        'Effect': 'Allow',
        'Action': [
          'oss:PutObject',
          'oss:GetObject',
          'oss:DeleteObject',
          'oss:ListObjects'
        ],
        'Resource': [
          ossUtils.unifyName(`${ossRootPath}/public`),
          ossUtils.unifyName(`${ossRootPath}/public/*`),
        ],
      },
    ]
  };

  const params = {
    'RegionId': cfg.env.regionId,
    'RoleArn': cfg.env.roleArn,
    'RoleSessionName': `${Date.now()}`.replace(/\W/g, ''),
    'Policy': JSON.stringify(policy)
  }

  log.info(`putTokenPublic`);
  return client.request('AssumeRole', params, requestOption).then((result) => {
    let data = result && result.Credentials;
    if (!data) {
      return Promise.reject({message: 'invalid token data'});
    }

    return Promise.resolve({
      ...data,
      region: cfg.env.region,
      bucket: cfg.env.bucket,
    });
  });
};

async function delDir(dir, opts = {}) {
  let res = await ossClient.list({
    prefix: dir,
    delimiter: '/',
  });

  await bluebird.map(res.objects || [], async obj => {
    if (!obj || !obj.name) {
      return;
    } else {
      await ossClient.delete(obj.name, {timeout: 60*60*1000});
    }
  }, {concurrency: opts.concurrency || 3});

  await bluebird.map(res.prefixes || [], async prefix => {
    if (!prefix) {
      return;
    } else {
      await delDir(prefix, {concurrency: 1});
    }
  }, {concurrency: opts.concurrency || 3});

  await ossClient.delete(dir);
}

async function del(name, opts = {}) {
  if (/\/$/.test(name)) {
    await delDir(name, opts);
  } else {
    await ossClient.delete(name, {timeout: 60*60*1000});
  }
}

async function copyDir(src, dest, opts = {}) {
  let res = await ossClient.list({
    prefix: src,
    delimiter: '/',
  });
  let dirname = ossUtils.dirname(src);

  await bluebird.map(res.objects || [], async obj => {
    if (!obj || !obj.name) {
      return;
    } else {
      let basename = ossUtils.basename(obj.name);
      await ossClient.copy(ossUtils.unifyName(`${dest}/${dirname}/${basename}`), obj.name, {timeout: 60*60*1000});
    }
  }, {concurrency: opts.concurrency || 3});

  await bluebird.map(res.prefixes || [], async prefix => {
    if (!prefix) {
      return;
    } else {
      await copyDir(prefix, ossUtils.unifyDir(`${dest}/${dirname}`), {concurrency: 1});
    }
  }, {concurrency: opts.concurrency || 3});
}

async function copy(src, dest, opts) {
  if (/\/$/.test(src)) {
    await copyDir(src, dest, opts);
  } else {
    let basename = ossUtils.basename(src);
    await ossClient.copy(ossUtils.unifyName(`${dest}/${basename}`), src, {timeout: 60*60*1000});
  }
}

async function mv(src, dest, opts = {}) {
  await copy(src, dest, opts);
  await del(src);
}

async function streamRequest(object) {
  const result = await ossClient.getStream(object, {timeout: 36000000});
  return result.stream;
}

async function multipleDownloadArch({zip, list, props} = {}) {
  for (let i=0, l=props.length; i<l; i++) {
    for (let j=0, lj=list.length; j<lj; j++) {
      const prop = props[i];
      const item = list[j];
      if (!item) {
        log.info(`multipleDownloadArch skip empty item`);
        continue;
      }

      let src = (typeof prop.src === 'function') ? prop.src(item) : item[prop.src];
      if (!src) {
        log.info(`multipleDownloadArch skip empty src`);
        continue;
      }

      log.info(`creating stream with ${src}`);
      const stream = prop.isLocal ?
        fs.createReadStream(src) :
        await streamRequest(src);

      stream.on('error', err => {
        return Promise.reject(err);
      });

      await new Promise((resolve, reject) => {
        let name = prop.naming ?
          ((typeof prop.naming === 'function') ? prop.naming(item) : item[prop.naming]) :
          ossUtils.basename(src);
        name = prop.dir ? `${prop.dir}/${name}` : name;

        log.info(`piping ${src} to ${name}`);
        zip.entry(stream, {name}, (err, entry) => {
          if (err) {
            return reject(err);
          }

          log.info(`downloaded file ${src} with size ${entry && entry.size} and crc ${entry && entry.crc}`);
          return resolve();
        });
      });
    }
  }
}

module.exports = {
  getToken,
  getTokenHP,
  putToken,
  putTokenHP,
  putTokenPublic,
  delDir,
  del,
  copyDir,
  copy,
  mv,
  streamRequest,
  multipleDownloadArch,
}