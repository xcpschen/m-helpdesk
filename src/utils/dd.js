import * as dd from 'dingtalk-jsapi'
import store from '@/store/index'
import request from '@/utils/request'
import Cookies from 'js-cookie'

function requestAuthCode () {
  return new Promise((resolve, reject)=>{
    if (process.env.VUE_DEBUG) {
      resolve("debug")
    } else {
      dd.ready(()=>{
        dd.runtime.permission.requestAuthCode({
            corpId: store.state.corpId, // 企业id
            onSuccess: function (info) {
              let code = info.code // 通过该免登授权码可以获取用户身份
              resolve(code)
            },
            onFail : function(err) {
              reject(JSON.stringify(err))
            }
        })
      })
    }
  })
}

// 登录保存token
export function login() {
  return new Promise((resolve,reject)=>{
    requestAuthCode().then(code => {
      request({
        url:'/login/auth',
        method:'post',
        headers:{
          "Login-Code":code,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        store.commit('SetUserInfo',res.data)
        setToken(res.data.Token)
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    }).catch(err => {
      alert(JSON.stringify(err))
      console.log(err.response)
    })
  })
}



const TokenKey = 'token'

export function getToken() {
  let a= Cookies.get(TokenKey)
  try{
    if (a !== ''){
      return a
    }else{
      return ''
    }
  } catch (e) {
    return ''
  }
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
