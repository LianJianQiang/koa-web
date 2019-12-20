const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const session = require('koa-generic-session');
const redistore = require('koa-redis');
const koaStatic = require('koa-static');

// const koaJWT = require('koa-jwt');

const { isProd } = require('./utils/env')

const { REDIS_CONF } = require('./conf/db');

// const jwtUserAPIRouter = require('./routes/api/jwt')
const utilsAPIRouter = require('./routes/api/utils')
const userAPIRouter = require('./routes/api/user')
const userViewRouter = require('./routes/view/user')
const errorViewRouter = require('./routes/view/error')

// const { JWT_SECRET_KEY } = require('./conf/secretKeys')

// error handler
let onerrorConf = {}
if (isProd) {
    onerrorConf = {
        redirect: '/error'
    }
}
onerror(app, onerrorConf)

// // JWT 加密认证
// app.use(koaJWT({
//     secret: JWT_SECRET_KEY
// }).unless({
//     path: [/\/users\/login/]     // 定义哪些目录不需要验证
// }))

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))

app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

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
        all: `${REDIS_CONF.host}:${REDIS_CONF.prot}`
    })
}))

// routes
// app.use(jwtUserAPIRouter.routes(), jwtUserAPIRouter.allowedMethods())       // JWT DEMO

app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())

app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 404 路由注册到最后面

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
