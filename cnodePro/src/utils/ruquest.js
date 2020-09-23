import axios from 'axios'

// 设置超时
const instance = axios.create({
  timeout: 50000
})

// 请求拦截
instance.interceptors.request.use(
  config => {
    // if (window.localStorage.getItem('token')) {
    //   config.headers.token = localStorage.getItem('token')
    // }
    return config
  },
  err => {
    console.log('err', err)
  }
)

// 响应拦截
instance.interceptors.response.use(
  response => {
    const data = response.data
    const status = response.status
    if (status != 200) {
      console.log('响应出错')
    } else {
      return data
    }
    return response
  },
  err => {
    console.log('err', err)
  }
)

export default instance
