const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const cfg = require('../assets/config/app')
const {log} = require('./lib/log')
const router = require('./router/index')
const db = require('./lib/mysql/db')

app.use(express.json())
app.use(cookieParser())

// cors
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || /10\./i.test(origin) || /localhost/i.test(origin) || /ai\.mgtv\.com/i.test(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

// db
const dbs = Object.keys(cfg.env.mysql).map(k => cfg.env.mysql[k])
db.init(dbs)

router.boot(app)

const server = app.listen(cfg.port, () => log.info(`app listening on port ${cfg.port}!`))
server.keepAliveTimeout = 60000
