const { User } = require('../db/model');
const { formatUser } = require('./_format');
const doCrypto = require('../utils/cryp')
const { addFollower } = require('./user-relation')


/**
 * 获取用户信息
 * @param {String} userName
 * @param {String} password
 */
const getUserInfo = async (userName, password) => {
    const whereOpt = { userName }
    if (password) Object.assign(whereOpt, { password: doCrypto(password) });

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
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
    })

    const data = result.dataValues;

    // 自己关注自己（为了方便首页获取数据）
    addFollower(data.id, data.id)

    return data;
}

/**
 * 删除用户
 * @param {string} userName 用户名
 */
async function deleteUser (userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    })
    // result 删除的行数
    return result > 0
}

/**
 * 更新用户信息
 * @param {Object} param0 要修改的内容 { newPassword, newNickName, newPicture, newCity }
 * @param {Object} param1 查询条件 { userName, password }
 */
const updateUser = async (
    { newPassword, newNickName, newPicture, newCity },
    { userName, password }
) => {
    // 拼接修改内容
    const updateData = {}
    if (newPassword) {
        updateData.password = newPassword
    }
    if (newNickName) {
        updateData.nickName = newNickName
    }
    if (newPicture) {
        updateData.picture = newPicture
    }
    if (newCity) {
        updateData.city = newCity
    }

    // 拼接查询条件
    const whereData = {
        userName
    }
    if (password) {
        whereData.password = password
    }

    // 执行修改
    const result = await User.update(updateData, {
        where: whereData
    })
    return result[0] > 0 // 修改的行数
}


module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
}
