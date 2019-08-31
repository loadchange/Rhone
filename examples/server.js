const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

require('./server2')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: true
  }
}))
app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname, {
  setHeaders(res) {
    res.cookie('XSRF-TOKEN-D', '1234abc')
  }
}))

app.use(express.static(__dirname))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cookieParser())

const router = express.Router()

router.get('/simple/get', (req, res) => {
  res.json({ msg: 'hello world' })
})

router.get('/base/get', (req, res) => {
  res.json(req.query)
})

router.post('/base/post', (req, res) => {
  res.json(req.body)
})

router.post('/base/buffer', (req, res) => {
  let msg = []
  req.on('data', chunk => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})

router.get('/error/get', (req, res) => {
  if (Math.random() > 0.5) {
    res.json({ msg: 'hello world' })
  } else {
    res.status(500)
    res.end()
  }
})

router.get('/error/timeout', (req, res) => {
  setTimeout(() => {
    res.json({ msg: 'hello world' })
  }, 3000)
})

registerExtendRouter()
registerInterceptorRouter()
registerConfigRouter()
registerCancelRouter()
registerMoreRouter()

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http:localhost:${port}, Ctrl+C to stop`)
})

function registerExtendRouter() {
  router.get('/extend/get', (req, res) => res.json({ msg: 'hello world' }))
  router.options('/extend/options', (req, res) => res.end())
  router.delete('/extend/delete', (req, res) => res.end())
  router.head('/extend/head', (req, res) => res.end())
  router.post('/extend/post', (req, res) => res.json(req.body))
  router.put('/extend/put', (req, res) => res.json(req.body))
  router.patch('/extend/patch', (req, res) => res.json(req.body))
  router.get('/extend/user', (req, res) => res.json({
    code: 0,
    message: 'ok',
    result: {
      name: 'jack',
      age: 18
    }
  }))
}

function registerInterceptorRouter() {
  router.get('/interceptor/get', (req, res) => res.end('hello'))
}

function registerConfigRouter() {
  router.post('/config/post', (req, res) => res.json(req.body))
}

function registerMoreRouter() {
  router.get('/more/get', (req, res) => {
    res.json(req.cookies)
  })
}

function registerCancelRouter() {
  router.get('/cancel/get', (req, res) => {
    setTimeout(() => {
      res.end('hello')
    }, 1000)
  })
  router.post('/cancel/post', (req, res) => {
    setTimeout(() => {
      res.json(req.body)
    }, 1000)
  })
}
