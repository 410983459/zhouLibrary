import router from '../router'

router.beforeEach(async (to, from, next) => {
  // 登陆判断
/*   const sessionId = localStorage.getItem('sessionId') || ''
  //   NProgress.start()
  if (sessionId) { // 已登录
    next()
  } else { // 未登录定向到登录页面
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  } */
  next()
})

router.afterEach((to, from) => {
  // finish progress bar
//   NProgress.done()
})
