const router = require('koa-router')();
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../../conf/secretKeys')

const util = require('util');
const verify = util.promisify(jwt.verify);

// JWT加密 demo
router.post('/users/login', (ctx, next) => {
    const { username, password } = ctx.request.body;

    let userInfo;
    if (username === 'zhangsan' && password === '123') {
        userInfo = {
            id: 1,
            username: 'zhangsan',
            nickname: '张三',
            gender: '男'
        }
    }

    let token;
    if (userInfo) {
        token = jwt.sign(userInfo, JWT_SECRET_KEY, { expiresIn: '1h' })
    }

    if (!userInfo) {
        ctx.body = {
            code: -1,
            data: {},
            msg: '登录失败'
        }
        return;
    }

    ctx.body = {
        code: 1,
        data: { token },
        msg: '登录成功'
    }
})

// JWT加密 demo
// Header加上 `Authorization: Bearer ${token}`
router.get('/users/getUserInfo', async (ctx, next) => {
    let token = ctx.header.authorization;
    token = token.split(' ')[1]

    try {
        const payload = await verify(token, JWT_SECRET_KEY)
        ctx.body = {
            code: 1,
            data: { userInfo: payload },
            msg: ''
        }
    } catch (e) {
        ctx.body = {
            code: -1,
            data: {},
            msg: 'verify token faild'
        }
    }
})

module.exports = router;

