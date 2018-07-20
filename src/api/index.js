import Api from './api';

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
    },
    updatePass:{
        url: 'pass/update',
        method: 'put'
    }
}); //用户管理
export let loginApi = (data) => Api.post('auth/admin/login', data) //用户管理

export let swiperApi = new Api('admin/swiper', 'swiperId',{
    enable: {
        url: '{swiperId}/enable',
        method: 'put'
    },
    disable:{
        url: '{swiperId}/disable',
        method: 'put'
    }
})