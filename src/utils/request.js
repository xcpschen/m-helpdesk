import axios from 'axios'
import router from '@/router'
import { login , getToken } from '@/utils/dd'
import { Notify } from 'vant'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000,// request timeout，
  withCredentials: true
})

// request interceptor
service.interceptors.request.use(
  config => {
  // do something before request is sent
    let token = getToken()
    if (token !== '') {
      config.headers['user-code'] = token
    }
    // config.headers['User-Agent'] = 'Iquestion'
    // config.headers['Host'] = 'Iquestion'
    return config
  },
  error => {
    this.config.loader.clear()
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Notify({ type: 'danger', message: res.message || 'Error' })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 512) {
        login().then(()=>{
          // router.push({path:"/"})
          location.reload()
        }).catch(err=>{
          Notify({ type: 'danger', message: "登录失败" })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + JSON.stringify(error)) // for debug
    Notify({ type: 'danger', message: error.message })
    return Promise.reject(error)
  }
)

export default service
