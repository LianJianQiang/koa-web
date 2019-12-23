const router = require('koa-router')();

const { PAGE_SIZE } = require('../../conf/constant')

const { loginRedirect } = require('../../middlewares/loginChecks')

const { getProfileBlogList } = require('../../controller/blog-profile')
const { isExist } = require('../../controller/user')


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
            pageSize: PAGE_SIZE,
            pageIndex: 1,
            count: 0
        }
    })
})

router.get('/profile', async (ctx, next) => {
    const { userName } = ctx.session.userInfo;
    ctx.redirect(`/profile/${userName}`)
})


router.get('/profile/:userName', async (ctx, next) => {
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName

    let curUserInfo = {};
    const { userName: curUserName } = ctx.params;

    const isMe = curUserName === myUserName
    if (isMe) {
        curUserInfo = myUserInfo
    } else {
        // 不是当前登录用户
        const existResult = await isExist(curUserName)
        if (existResult.errno !== 0) {
            // 用户名不存在
            return;
        }
        curUserInfo = existResult.data;
    }

    const result = await getProfileBlogList(curUserName, 0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data


    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize: pageSize || PAGE_SIZE,
            pageIndex,
            count
        },
        userData: {
            userInfo: curUserInfo,
            isMe,
            fansData: {
                count: 0,
                list: []
            },
            followersData: {
                count: 0,
                list: []
            },
            amIFollowed: false,
            atCount: 0
        }
    })
})





module.exports = router;

