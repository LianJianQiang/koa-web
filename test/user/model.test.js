/**
 * @description blog model test
 */

const { Blog } = require('../../src/db/model/index')

test('Blog 模型的各个属性，符合预期', () => {
    const blog = Blog.build({
        userId: '1',
        content: 'content',
        image: 'test.png',
    })

    expect(blog.userId).toBe('1')
    expect(blog.content).toBe('content')
    expect(blog.image).toBe('test.png')
})
