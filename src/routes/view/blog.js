const router = require('koa-router')();

const { loginRedirect } = require('../../middlewares/loginChecks')

router.get('/', async (ctx, next) => {
    const { userInfo = {} } = ctx.session;

    await ctx.render('index', {
        userData: {
            userInfo: userInfo,
            fansData: {
                count: 0,
                list: []
            },
            followersData: {
                count: 0,
                list: []
            },
            atCount: 0
        },
        blogData: {
            isEmpty: true,
            blogList: [],
            pageSize: 10,
            pageIndex: 1,
            count: 0
        }
    })
})

module.exports = router;

