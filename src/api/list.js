import request from '@/utils/request'
import { SimpleFormUploadToQiniu } from '@/utils/upload'
import Qs from 'qs'

export function getList (param) {
  return request({
    url: '/flow/list',
    method: 'post',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    params:param
  })
}

export function getInfo (param) {
  return request({
    url: '/flow/show',
    method: 'get',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    params:param
  })
}

export function CreateFlow(param) {

  return request({
    url:'/flow/create',
    method:'post',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    transformRequest:[function(data){
      return Qs.stringify(data,{arrayFormat: 'brackets'})
    }],
    data:param
  })
}

export function GetCity(){
  return request({
    url:'/flow/city',
    method:'get'
  })
}

export function DoReply(param){
  return request({
    url:'/flow/reply',
    method:'post',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    transformRequest:[function(data){
      return Qs.stringify(data,{arrayFormat: 'brackets'})
    }],
    data:param
  })
}

export function Recall(param){
  return request({
    url:'/flow/recall',
    method:'post',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    transformRequest:[function(data){
      return Qs.stringify(data)
    }],
    data:param
  })
}

export function Comment(param){
  return request({
    url:'/flow/comment',
    method:'post',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    transformRequest:[function(data){
      return Qs.stringify(data)
    }],
    data:param
  })
}

export function Finished(param){
  return request({
    url:'/flow/finished',
    method:'post',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    transformRequest:[function(data){
      return Qs.stringify(data)
    }],
    data:param
  })
}

export function UploadToQiniu(param,file){
  return new Promise((resolve,reject) => {
    GetStaticToken(param).then(rsp => {
      SimpleFormUploadToQiniu(rsp.data,file).then(qiniuRsp =>{
        resolve({
          qiniuRsp:qiniuRsp,
          url:rsp.data.bucket_url+rsp.data.file_path
        })
      }).catch(err=>{
        console.log(err)
        reject(err)
      })
    }).catch(err =>{
      reject(err)
    })
  })
}

export function GetStaticToken(param){
  return request({
    url: '/static-token',
    method: 'post',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    transformRequest:[function(data) {
      return Qs.stringify(data)
    }],
    data: param
  })
}

export function GetMoreStaticToken(param){
  return request({
    url: '/static-token-more',
    method: 'post',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    transformRequest:[function(data) {
      return Qs.stringify(data,{arrayFormat: 'brackets'})
    }],
    data: param
  })
}

export function GetQtype(){
  return request({
    url:'/qtype',
    method:'get'
  })
}

export function FlowDel(param){
  return request({
    url:'/flow/del',
    method:'get',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    params:param
  })
}

export function Edit(param){
  return request({
    url:'/flow/edit',
    method:'post',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    transformRequest:[function(data){
      return Qs.stringify(data,{arrayFormat: 'brackets'})
    }],
    data:param
  })
}