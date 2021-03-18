import router from './router'
import {login,getToken} from '@/utils/dd'

const whiteList = [] // no redirect whitelist

router.beforeEach(async(to, from, next) => {

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
        login().then(rsp=>{
            // alert(JSON.stringify(rsp))
            next()
        })
    }
  }
})
