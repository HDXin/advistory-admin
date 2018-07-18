var env = process.env
module.exports = {
    name: '测试',
    env: env,
    apiUrlPrefix: {
        development: '/api/operation/',
        production: "/api/operation/",
    },
    imageUrl:{
        development: '/oss/aliyun/upload/',
        production: "/oss/aliyun/upload/",
    },
};