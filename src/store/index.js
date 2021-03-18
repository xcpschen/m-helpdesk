import Vue from 'vue'
import Vuex from 'vuex'
import { login } from '@/utils/dd'
Vue.use(Vuex)
const UserKey = "UserKey"
const store = new Vuex.Store({
    state: {
        corpId: process.env.DT_CORP_ID,
        token: ''
    },
    getters: {
        token:state=>token,
        corpId: state => state.corpId,
        GetUser: state =>{
            let data = sessionStorage.getItem(UserKey)
            if (data == null){
                login().then(_ => {
                    data = sessionStorage.getItem(UserKey)
                    window.location.reload()
                })
            }
            return JSON.parse(data)
        }
    },
    mutations: {
        SetUserInfo:(state,userInfo)=>{
            // state.userinfo = userInfo
            state.token = userInfo.Token
            sessionStorage.setItem(UserKey,JSON.stringify(userInfo))
        },
        Login:(status,bo)=>{
            status.isLogin = bo
        }
    },
    actions: {
    }
})

export default store
