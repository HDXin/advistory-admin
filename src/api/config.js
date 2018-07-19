var env = process.env
module.exports = {
    name: '测试',
    env: env,
    apiUrlPrefix: {
        development: 'http://api.51alf.cn',
        production: "http://api.51alf.cn",
    },
    imageUrl: {
        development: 'http://api.51alf.cn/image/',
        production: "http://api.51alf.cn/image/",
    }
};