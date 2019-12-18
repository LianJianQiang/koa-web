const redis = require('redis')

const { REDIS_CFG } = require('../cfg/db.js')

const redisClient = redis.createClient(REDIS_CFG.prot, REDIS_CFG.host)

redisClient.on('error', err => {
    console.log('redisClient error : ', err)
})


/**
 * redis set
 * @param {String} key
 * @param {String} value
 * @param {Number} timeout 过期时间，单位 s
 */
function set (key, value, timeout = 60 * 60) {
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }

    redisClient.set(key, value)
    redisClient.expire(timeout)
}

/**
 * redis get
 * @param {Stirng} key
 */
function get (key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                return reject(err);
            }

            if (val === null) {
                return resolve(null)
            }

            try {
                resolve(JSON.parse(val))
            } catch (e) {
                resolve(val)
            }
        })
    })
    return promise;
}

module.exports = {
    set
}
