/**
 * @description json schema 验证中间件
 */

const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')


/**
 * json schema 校验中间件
 * @param {Function} validateFn 验证函数
 */
const genValidator = (validateFn) => {
    const validator = async (ctx, next) => {
        const data = ctx.request.body;
        const error = validateFn(data);

        if (error) {
            // 验证失败
            ctx.body = new ErrorModel(jsonSchemaFileInfo);
            return;
        }

        // 验证成功，继续
        await next();
    }

    return validator;
}

module.exports = { genValidator };


