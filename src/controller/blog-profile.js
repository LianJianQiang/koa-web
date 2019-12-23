
const { SuccessModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../conf/constant')
// const ERROR_INFO = require('../model/ErrorInfo')
const { getBlogListByUser } = require('../services/blog')



/**
 * 获取个人主页微博列表
 * @param {string} userName 用户名
 * @param {number} pageIndex 当前页面
 */
const getProfileBlogList = async (userName, pageIndex = 0) => {
    const result = await getBlogListByUser({
        userName, pageIndex, pageSiz: PAGE_SIZE
    })

    const blogList = result.blogList;

    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
    })
}


module.exports = {
    getProfileBlogList
}
