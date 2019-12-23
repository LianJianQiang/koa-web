const seq = require('../seq');
const { STRING, INTEGER, TEXT } = require('../types');

const Blog = seq.define('blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
    },
    content:  {
        type: TEXT,
        allowNull: false,
        comment: '微博内容'
    },
    image: {
        type: STRING,
        allowNull: true,
        comment: '图片地址'
    }
})

module.exports = Blog;


