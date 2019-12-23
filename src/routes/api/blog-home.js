/**
 * blog 首页 API
 */

const xss = require('xss')
const router = require('koa-router')();
const { loginCheck } = require('../../middlewares/loginChecks')
const { create } = require('../../controller/blog-home')

const { genValidator } = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')


router.prefix('/api/blog')


router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
    const { content, image } = ctx.request.body;
    const { id: userId } = ctx.session.userInfo;
    ctx.body = await create({ userId, content: xss(content), image })
})






module.exports = router;


