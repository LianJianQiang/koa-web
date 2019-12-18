const server = require('./server');

test('json接口', async () => {
    const res = await server.get('/json');
    expect(res.body).toEqual({
        title: 'koa2 json'
    })

    expect(res.body.title).toBe('koa2 json');
})

// // post请求
// test('json接口', async () => {
//     const res = await server.post('/login').send({
//         username: 'zhangsan',
//         password: '123'
//     });
//     expect(res.body).toEqual({
//         title: 'koa2 json'
//     })

//     expect(res.body.title).toBe('koa2 json');
// })