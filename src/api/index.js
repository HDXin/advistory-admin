import Api from './api';

export const userApi = new Api('admin/user', 'userId', {
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
    },
    resetPass:{
        url: '{userId}/pass/reset',
        method: 'put'
    }
}); //用户管理
export const loginApi = (data) => Api.post('auth/admin/login', data) //用户管理

export const swiperApi = new Api('admin/swiper', 'swiperId',{
    enable: {
        url: '{swiperId}/enable',
        method: 'put'
    },
    disable:{
        url: '{swiperId}/disable',
        method: 'put'
    }
})
export const articleApi = new Api('/admin/article', 'articleId',{
    validCode:{
        url: 'code/isValid',
        method: 'get'
    }
})

export const feedbackApi = new Api('/admin/feedback', 'feedbackId');
export const vipUserApi = new Api('/admin/appUser', 'userId',{
    enable: {
        url: '{userId}/enable',
        method: 'put'
    },
    disable:{
        url: '{userId}/disable',
        method: 'put'
    }
});
export const advistoryInfoApi = new Api('admin/advistoryInfo', 'advistoryId')