const router = require('koa-router')();

router.get('/error', async (ctx) => {
    await ctx.render('error')
})

router.get('*', async (ctx, next) => {
    console.log(404)
    await ctx.render('404');
})

module.exports = router

