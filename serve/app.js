const express = require('express')
const app = express()
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const server = require('http').Server(app)
const io = require('socket.io')(server)

const path = require('path')
const cors = require('cors')

const port = process.env.PORT || 3000

// 获取所有在线用户token
function getSocketIds(sockets) {
  let ids = []
  sockets.forEach((socket) => ids.push(socket.handshake.query.token))
  return ids
}
// 更新在线用户
function asyncConnection(io, sockets) {
  io.sockets.emit('message', {
    type: 'UPDATE_CONNECTION',
    data: getSocketIds(sockets),
  })
}
// 当用户上线的时候，把队列相关的消息发送清空
function emitMesQueque(toUserSocketId) {
  const offlineMes = mesQueque[toUserSocketId]
  if (offlineMes && offlineMes.length) {
    offlineMes.forEach((message, index) => {
      const targetSocket = sockets.get(toUserSocketId)
      targetSocket.emit('message', message)
    })
    mesQueque[toUserSocketId] = []
  }
}
// socket.io
const sockets = new Map()
const mesQueque = {}

io.on('connection', function (socket) {
  const token = socket.handshake.query.token
  console.log('connection', token)
  sockets.set(token, socket)

  asyncConnection(io, sockets)

  // 离线消息同步
  emitMesQueque(token)

  // 断开
  socket.on('disconnect', function (e) {
    console.log('disconnect', token, e)
    sockets.delete(token)
    asyncConnection(io, sockets)
  })

  // 自定义事件
  socket.on('message', function (message) {
    message = {
      ...message,
      fromUserSocketId: token,
      date: new Date().getTime(),
    }
    console.log(message)
    if (message.type === 'ONE_TO_ONE') {
      const { toUserSocketId } = message
      const targetSocket = sockets.get(toUserSocketId)
      if (targetSocket) {
        // 对方在线 发给目标
        targetSocket.emit('message', message)
      } else {
        // 对方不在线 存储到消息队列
        if (mesQueque[toUserSocketId]) {
          mesQueque[toUserSocketId].push(message)
        } else {
          mesQueque[toUserSocketId] = [message]
        }
      }
      // 同步状态
      socket.emit('message', message)
    }
  })
})

app.use(cors())

// 解析 application/json
app.use(bodyParser.json())

// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')))

app.use(
  express.static(path.join(__dirname, 'build'), {
    maxAge: '5m', // 5分钟
    etag: true,
    setHeaders: function (res, path, stat) {
      res.set('x-csrf', 'no-csrf')
    },
  })
)

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.post('/monitor/performance', function (req, res) {
  console.log(req.body)
  res.send({
    code: 0,
    mes: 'ok',
  })
})

server.listen(port)

console.log('bat-assets project started http://127.0.0.1:3000')

// const proxy = require('http-proxy-middleware')
// const compression = require('compression')
// const RUNTIME_ENV = process.env.RUNTIME_ENV || 'dev'
// const apiMaps = {
//   // dev 开发
//   dev: [{ prefix: '/music', proxyTo: 'http://127.0.0.1:3004', rewrite: '' }],
//   // pro 生产
//   pro: [
//     {
//       prefix: '/monitor',
//       proxyTo: 'http://120.79.229.220:3004',
//       rewrite: ''
//     }
//   ]
// }
// app.use(compression())

// apiMaps[RUNTIME_ENV].map(api =>
//   app.use(
//     api.prefix,
//     proxy({
//       pathRewrite: api.hasOwnProperty('rewrite')
//         ? { [`^${api.prefix}`]: api.rewrite }
//         : {},
//       target: api.proxyTo,
//       changeOrigin: true,
//       ws: false
//     })
//   )
// )
