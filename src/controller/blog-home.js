
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const ERROR_INFO = require('../model/ErrorInfo')

const { createBlog } = require('../services/blog')

/**
 * 创建微博
 * @param {Object} param0 创建微博所需的数据
 */
const create = async ({ userId, content, image }) => {
    try {
        const blog = await createBlog({
            userId, content, image
        })

        return new SuccessModel(blog);
    } catch (e) {
        return new ErrorModel(ERROR_INFO.createBlogFailInfo)
    }
}


module.exports = {
    create
}
