import Api from './Api';

export let userApi = new Api('admin/user', 'userId', {
    validUserName:{
        url: 'valid/username',
        method: 'get'
    }
}); //用户管理
export let loginApi = (data) => Api.post('auth/admin/login', data) //用户管理