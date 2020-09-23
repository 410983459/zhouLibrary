<template>
    <div id="home">
        <van-tabs @click="tabChange" v-model="activeName">
            <van-tab v-for="(item,index) in tabName" :key="index" :name="item.name" :title="item.title" >
              <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
                 <div class="contant" v-for="item in topicListNew" :key="item.id" @click="contentClick(item)">
                     <div class="pic left">
                        <!-- <img :src="item.author.avatar_url" :alt="item.author.avatar_url?'失败':''"> -->
                      </div>
                      <div class="center">
                          <div :class="item.top?'type':'share'">
                          <span v-if="item.top">置顶</span>
                          <span v-else-if="item.tab=='share'">分享</span>
                          <span v-else-if="item.tab=='ask'">问答</span>
                          <span v-else-if="item.tab=='good'">精华</span>
                          <span v-else-if="item.tab=='jod'">招聘</span>
                      </div>
                        <p>
                          <h3>{{item.title}}</h3>
                        </p>
                      </div>
                   <div class="right">
                     <span>{{item.create_at | dateFilters}}</span>
                   </div>
                 </div>
                  <van-loading v-if="isshow" size="26" type="spinner" color="#1989fa" />
                  <!-- 分页 -->
                 <div class="page">
                    <van-pagination
                    v-model="currentPage"
                    :total-items="topicListNew.length"
                    :show-page-size="item.page"
                    :items-per-page="item.limit"
                    force-ellipses
                    @change="pageChange"
                  />
                 </div>
                 </mescroll-vue>
            </van-tab>
        </van-tabs>

    </div>
</template>

<script>
import { getTopics } from '../../api/index'
import { dateFilters } from '../../utils/datafiflter.js'
// 引入mescroll组件
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  data () {
    return {
      isshow: false,
      pageItem: 10,
      topicList: [], // 文章列表
      currentPage: 1,
      activeName: 'all',
      tabName: [
        {
          title: '全部',
          name: 'all'
        },
        {
          title: '精华',
          name: 'good'
        },
        {
          title: '分享',
          name: 'share'
        },
        {
          title: '问答',
          name: 'ask'
        },
        {
          title: '招聘',
          name: 'jod'
        },
        {
          title: '客户端测试',
          name: 'test'
        }
      ],
      mescroll: null, // mescroll实例对象
      mescrollDown: {
        callback: this.downCallback
        // auto: true,
        // offset: 50
      }, // 下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: { // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>'
        // auto: true,
        // offset: 50,
        // dataList: this.topicList // 列表数据
      }
    }
  },

  computed: {
    topicListNew () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.topicList = this.topicList.filter(x => x.top).concat(this.topicList.filter(x => !x.top))
      return this.topicList
    }
  },
  created () {
    // 获取全部数据
    this.getdata()
  },
  components: {
    MescrollVue // 注册mescroll组件
  },
  filters: {
    dateFilters
  },
  // beforeRouteEnter (to, from, next) { // 如果没有配置顶部按钮或isBounce,则beforeRouteEnter不用写
  //   next(vm => {
  //     // 滚动到原来的列表位置,恢复顶部按钮和isBounce的配置
  //     vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter()
  //   })
  // },
  // beforeRouteLeave (to, from, next) { // 如果没有配置顶部按钮或isBounce,则beforeRouteLeave不用写
  //   // 记录列表滚动的位置,隐藏顶部按钮和isBounce的配置
  //   this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave()
  //   next()
  // },
  methods: {
    // 获取全部数据
    getdata () {
      this.isshow = true
      const param = {
        page: this.currentPage,
        tab: this.activeName,
        limit: 20
      }
      getTopics(param).then(res => {
        if (res.success) {
          this.topicList = res.data
          this.isshow = false
        }
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        console.log('数据请求出错')
        this.isshow = true
      })
    },
    // 分页页数改变
    pageChange (val) {
      console.log('val', val)
      this.currentPage = val
      this.getdata()
    },
    // tab标签切换触发
    tabChange (key, name, e) {
      console.log('tab切换', key, name)
      this.isshow = true
      this.tabName.forEach(x => {
        if (x.title == name) {
          this.activeName = x.name
          this.currentPage = 1
          this.getdata()
        }
        this.isshow = false
      })
    },
    // 点击任意一项触发
    contentClick (val) {
      console.log('内容val', val)
      this.$router.push(`/articleDetails/articleDetails/${val.id}`)
    },
    // 下拉刷新的回调
    downCallback () {
      console.log('下拉刷新')
      this.getdata()
    },
    // 上拉加载更多的回调
    upCallback () {
      console.log('上拉加载')
      this.getdata()
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit (mescroll) {
      this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    }
  }
}
</script>

<style lang="less" scoped>
#home /deep/.van-tabs__line{
    background-color: #80bd01;
}
#home /deep/.van-tab__text--ellipsis{
  font-size: 28px;
}
#home .page{
  display: flex;
  justify-content: center;
}
#home /deep/.van-pagination{
    width: 50%;
  }
#home{
  margin-top: 5px;
  .contant{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    .left{
      img{
        // flex: 0.15;
        display: block;
          width: 60px;
          height: 60px;
          text-align: center;
          line-height: center;
          margin-right: 25px;
          border: 1px solid #ccc;
        // flex: 0.2;
      }
    }
    .center{
        flex: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        overflow: hidden;
      .type{
        span{
          display: block;
          width: 68px;
          height: 40px;
          border-radius: 5px;
          color:white;
          line-height: 40px;
          margin-right: 10px;
          background-color: #80bd01;
        }
      }
      .share{
        span{
          display: block;
          width: 68px;
          height: 40px;
          border-radius: 5px;
          color:#999;
          line-height: 40px;
          margin-right: 10px;
          background-color: #e5e5e5;
        }
      }
      h3{
        margin-right: 10px;
        overflow:hidden;
        white-space:nowrap; /*不允许换行*/
        text-overflow:ellipsis;/*超出部分省略号显示*/
      }
    }
    .right{
      // float: right;
    }
  }
  /*通过fixed固定mescroll的高度*/
  .mescroll {
    position: fixed;
    top: 366px;
    bottom: 0;
    height: auto;
  }
}
</style>
