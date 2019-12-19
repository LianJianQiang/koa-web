const { User } = require('../db/model');
const { formatUser } = require('./_format');

/**
 * 获取用户信息
 * @param {String} userName
 * @param {String} password
 */
const getUserInfo = async (userName, password) => {
    const whereOpt = { userName }
    if (password) Object.assign(whereOpt, { password });

    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })

    // 未找到
    if (result === null) {
        return null
    }

    return formatUser(result.dataValues);
}

/**
 * 创建用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别
 * @param {string} nickName 昵称
 */
const createUser = async ({ userName, password, gender = 3, nickName }) => {
    const result = User.create({
        userName,
        password,
        nickName,
        gender
    })

    const data = result.dataValues;

    return data;
}


module.exports = {
    getUserInfo,
    createUser
}
