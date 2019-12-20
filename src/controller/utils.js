
const path = require('path')

const fse = require('fs-extra')

const { ErrorModel, SuccessModel } = require('../model/ResModel')
const ERROR_INFO = require('../model/ErrorInfo')

const { updateUser } = require('../services/user');

// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')

// 文件最大体积 1M
const MAX_SIZE = 1024 * 1024 * 1024

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

/**
 * 保存文件
 * @param {string} name 文件名
 * @param {string} type 文件类型
 * @param {number} size 文件体积大小
 * @param {string} filePath 文件路径
 */
const saveFile = async (ctx, { name, type, size, filePath }) => {
    if (size > MAX_SIZE) {
        await fse.remove(filePath)
        return new ErrorModel(ERROR_INFO.uploadFileSizeFailInfo)
    }

    // 移动文件
    const fileName = `${Date.now()}.${name}`
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
    await fse.move(filePath, distFilePath)

    // const url = `/${fileName}`

    // const res = await updateUser({ newPicture: url }, { userName: ctx.session.userInfo.userName })
    // if (!res) {
    //     await fse.remove(filePath)
    //     return new ErrorModel(ERROR_INFO.changeInfoFailInfo)
    // }

    // // 执行成功
    // Object.assign(ctx.session.userInfo, {
    //     picture: url
    // })

    return new SuccessModel({ url: `/${fileName}` })
}


module.exports = {
    saveFile
}

