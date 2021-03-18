import request from '@/utils/request'

export function CheckMyFlowTJ(){
    return request({
        url: '/flow/myFlowNum',
        method: 'post'
    });
}