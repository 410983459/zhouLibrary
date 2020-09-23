<template>
  <div class="home">
    <div class="top">
      <div class="img">
        <img src="../assets/images/logo.png" alt="">
      </div>
      <div class="scarch">
        <van-icon name="search" />
        <input type="text">
      </div>
      <div class="alink">
          <router-link  v-for="(item,index) in navlist" :key="index" :to="item.path">{{item.name}}</router-link>
      </div>
    </div>
    <router-view></router-view>
    <!-- <index></index> -->
  </div>
</template>

<script>
// @ is an alias to /src
import index from './index/index'
export default {
  data () {
    return {
      navlist: [
        {
          name: '首页',
          path: '/index/index'
        },
        {
          name: '新手入门',
          path: '/new/new'
        },
        {
          name: 'API',
          path: '/new/new'
        },
        {
          name: '关于',
          path: '/new/new'
        },
        {
          name: '注册',
          path: '/new/new'
        },
        {
          name: '登陆',
          path: '/new/new'
        }
      ]
    }
  },
  components: {
    index
  }
}
</script>
<style lang="less" scoped>
.home .top{
  // display: flex;
  // justify-content: center;
  height: 322px;
  background-color: #444;
  .img{
    padding-top: 5px;
  }
  .scarch{
    display: flex;
    padding-left: 15px;
    justify-content: flex-start;
    align-items: center;
    width:70%;
    height: 56px;
    margin: 0 auto;
    border: 1px solid #888;
    background-color: #888;
    border-radius: 20px;
    i{
      font-size: 34px;
      margin-right: 10px;
    }
    input{
      width: 90%;
    background-color: #888;
    border: none;
    color: white;
    // padding: 2px;
    }
  }
  .alink{
    color: #ccc;
    margin-top: 40px;
    font-size: 28px;;
    a{
      margin-right: 26px;
    }
  }
}
</style>
