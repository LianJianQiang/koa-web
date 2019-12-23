/**
 * Blog
 */

const { Blog, User } = require('../db/model/index')

/**
 * 创建微博
 * @param {Object} param0 创建微博的数据
 */
async function createBlog ({ userId, content, image }) {
    const result = await Blog.create({
        userId,
        content,
        image
    })

    return result.dataValues
}



module.exports = {
    createBlog
}

