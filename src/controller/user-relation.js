/**
 * @description 用户关系 controller
 */
const {
    getUsersByFollower,
    // getFollowersByUser,
    // addFollower,
    // deleteFollower
} = require('../services/user-relation')

const { SuccessModel, ErrorModel } = require('../model/ResModel')



const getFans = async (userId) => {
    const { count, userList } = await getUsersByFollower(userId)

    return new SuccessModel({
        count,
        fansList: userList
    })
}



module.exports = {
    getFans,
}


