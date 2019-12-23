/**
 * @description blog 首页 api test
 */


const server = require('../server')
const { Z_COOKIE } = require('../testUserInfo')


// 存储微博 id
let BLOG_ID = ''

test('创建一条微博', async () => {
    const content = '单元测试自动创建的微博_' + Date.now()
    const image = '/xxx.png'

    const res = await server.post('/api/blog/create')
        .send({ content, image })
        .set('cookie', Z_COOKIE)

    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)

    // 记录微博 id
    BLOG_ID = res.body.data.id
})

