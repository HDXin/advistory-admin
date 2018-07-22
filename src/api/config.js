var env = process.env
module.exports = {
    name: '测试',
    env: env,
    apiUrlPrefix: {
        development: 'http://advistory.51alf.cn/api',
        production: "http://advistory.51alf.cn/api",
    },
    imageUrl: {
        development: 'http://advistory.51alf.cn/api/image/',
        production: "http://advistory.51alf.cn/api/image/",
    }
};