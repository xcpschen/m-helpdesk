import request from '@/utils/request'

export function CityList(){
    return request({
        url: '/city-list',
        method: 'post'
    });
}
