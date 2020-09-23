import request from '../utils/ruquest'

// 接口地址
const api = 'https://cnodejs.org/api/v1'

// 主题首页分类接口
export const getTopics = param => {
  return request({
    url: api + '/topics',
    method: 'get',
    params: param
  })
}
// 获取任意一条文章的详细信息
export const getArticleDetail = (id) => {
  return request({
    url: api + '/topic/' + id,
    method: 'get'
  })
}
