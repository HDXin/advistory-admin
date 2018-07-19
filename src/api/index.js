import Api from './Api';

export let userApi = new Api('admin/user', 'userId', {
    validUserName:{
        url: 'valid/username',
        method: 'get'
    },
    enable: {
        url: '{userId}/enable',
        method: 'put'
    },
    disable:{
        url: '{userId}/disable',
        method: 'put'
    }
}); //用户管理
export let loginApi = (data) => Api.post('auth/admin/login', data) //用户管理