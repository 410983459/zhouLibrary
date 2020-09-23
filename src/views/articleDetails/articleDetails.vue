<template>
    <div class="articleDetails">
        <h3>{{detail.title}}</h3>
        <div class="content" v-html="detail.content"></div>
    </div>
</template>

<script>
import { getArticleDetail } from '../../api/index'
export default {
  data () {
    return {
      detail: {
        content: '',
        title: ''
      }
    }
  },
  created () {
    this.getDetails()
  },
  methods: {
    // 获取文章详情
    getDetails () {
      const id = this.$route.params.id
      getArticleDetail(id).then(res => {
        if (res.success || res) {
          console.log('文章详情res', res)
          this.detail = res.data
        }
      }).catch(err => {
        console.log('err', err)
      })
    }
  }

}
</script>

<style lang="less" scoped>
.articleDetails{
    width: 90%;
    margin: 0 auto;
    h3{
        font-size: 46px;
        font-weight: 600;
        padding: 30px 130px 20px 0px;
        line-height: 64px;
        text-align: left;
    }
   .content /deep/ .markdown-text p:nth-of-type(1),
   .content /deep/ .markdown-text p:nth-of-type(2)
   {
        text-align: left;
        font-size: 30px;
        margin-bottom: 24px;
        line-height:46px;
    }
     .content /deep/ .markdown-text p:nth-of-type(1) strong{
         font-weight: 600;;
     }
      .content /deep/ .markdown-text p:nth-of-type(2) a{
          color: royalblue;
      }
    .content /deep/ .markdown-text{
        text-align: left;
        font-size: 30px;
        line-height: 48px;
        h2,h3{
            font-size: 48px;
            font-weight: 600;
            padding-bottom: 20px;
            margin-bottom: 30px;
            border-bottom: 1px solid #ccc;
            word-break: break-word;
        }
        ul{
            margin-left: 60px;
            padding: 20px 0px;
            list-style: disc;
        }
        p{
            margin-bottom: 20px;
        }
        img{
            width: 100%;
        }
        pre.prettyprint{
            word-break: break-word;
            background: #f7f7f7;
            font-size: 24px;
            white-space:normal;
            padding: 10px 20px;
        }
        a{
            color: royalblue;
            word-break: break-word;
        }
    }
}
</style>
