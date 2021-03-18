import request from '@/utils/request'

export function login(params){
    return request({
        url: '/api/list',
        method: 'post',
        params
    });
} 

