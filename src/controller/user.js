
const { getUserInfo, createUser } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const ErrorInfo = require('../model/ErrorInfo');
const doCrypto = require('../utils/cryp')

/**
 * 判断用户名是否重复
 * @param {String} userName
 */
const isExist = async (userName) => {
    const userInfo = await getUserInfo(userName);

    if (userInfo) {
        return new SuccessModel(userInfo);
    } else {
        return new ErrorModel(ErrorInfo.registerUserNameNotExistInfo)
    }
}

/**
 * 用户注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别（1 男，2 女，3 保密）
 */
const register = async ({ userName, password, gender }) => {
    const userInfo = await getUserInfo(userName);

    if (userInfo) {
        return new ErrorModel(ErrorInfo.registerUserNameExistInfo);
    }

    try {
        await createUser({ userName, password: doCrypto(password), gender })
        return new SuccessModel();
    } catch (err) {
        console.log(err.message, err.stack)
        return new ErrorModel(ErrorInfo.registerFailInfo)
    }
}

module.exports = {
    isExist,
    register
}
