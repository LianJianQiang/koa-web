const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const session = require('koa-generic-session');
const redistore = require('koa-redis');

const { REDIS_CFG } = require('./cfg/db');

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
// 页面显示
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// // logger
// app.use(async (ctx, next) => {
//     const start = new Date()
//     await next()
//     const ms = new Date() - start
//     console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// session配置
app.keys = ['Ussdw_wq_992**2'];
app.use(session({
    key: 'weibo.sid',       // cookie name，默认：`koa:sid:`
    prefix: 'weibo:sess:',       // redis key 前缀，默认：`koa:sess:`
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    },
    store: redistore({
        all: `${REDIS_CFG.host}:${REDIS_CFG.prot}`
    })
}))


// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
