var env = process.env
module.exports = {
    name: '测试',
    env: env,
    apiUrlPrefix: {
        development: 'http://api.51alf.cn',
        production: "/api/operation/",
    },
    imageUrl: {
        development: 'http://api.51alf.cn/image/',
        production: "/api/operation/",
    }
};