<template>
  <div class="content whisper-content leacots-content details-content">
    <div class="cont w1000">
      <div class="whisper-list">
        <div class="item-box" v-if="article">
          <div class="review-version">
            <div class="form-box">
              <div class="article-cont">
                <div class="title">
                  <h3>{{article.title}}</h3>
                  <p class="cont-info"><span class="data">{{article.createTime}}</span><span class="types">{{article.categoryName}}</span></p>
                </div>
                <div v-html="article.content"></div>
                <div class="description">{{article.description}}</div>
              </div>
              <div class="form">
                <div class="layui-form">
                  <div class="layui-form-item layui-form-text">
                    <div class="layui-input-block">
                      <textarea name="desc" placeholder="既然来了，就说几句" class="layui-textarea" v-model="content"></textarea>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <div class="layui-input-block" style="text-align: right;">
                      <button class="layui-btn definite" @click="addComment()">確定</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <template v-if="article.comments">
              <div class="volume">
                全部留言 <span>{{article.comments.length}}</span>
              </div>
              <div class="list-cont">         
                <div class="cont" v-for="(c, index) in article.comments.slice((commentPage - 1) * 5, commentPage * 5) " :key="index">
                  <div class="img">
                    <img :src="c.authorAvator" class="avator-img">
                  </div>
                  <div class="text">
                    <p class="tit"><span class="name">{{c.author}}</span><span class="data">{{c.date}}</span></p>
                    <p class="ct">{{c.content}}</p>
                  </div>
                </div>
                <el-pagination id="pagination" style="margin-top: 40px;"
                  background
                  layout="prev, pager, next"
                  :current-page="commentPage"
                  :page-size="5"
                  :pager-count="5"
                  :total="article.comments.length"
                  @current-change="handlePageChange"
                  >
                </el-pagination>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        commentPage: 1,
        article: '',
        content: ''
      };
    },
    methods: {
      handlePageChange: function (v) {
        this.commentPage = v;
      },
      getArticleAndComments: function () {
        var vm = this;
        var article = vm.$route.params.article;
        var blogId = vm.$route.params.id;
        var articleId = vm.$route.params.articleId;
        if (!blogId || !articleId) {
          vm.$router.replace({
            name: 'Fail',
            params: {
              msg: '404~ 好像来到了异次元TT'
            }
          });
        }
        vm.isLoading = true;
        if (article) {
          // 获取评论
          vm.$http.post('api/comment/list', vm.$util.stringify({
            parent: articleId,
            type: 2
          })).then(function (res) {
            if (res.data.code == 200) {
              article.comments = res.data.data;
              vm.article = article;
            } else {
              vm.$router.replace({
                name: 'Fail',
                params: {
                  msg: res.data.msg || '未知错误'
                }
              });
            }
            vm.isLoading = false;
            });
          } else {
            vm.$http.post('api/article/get', vm.$util.stringify({
              id: articleId,
              blogId: blogId
            })).then(function (res) {
            if (res.data.code == 200) {
              vm.article = res.data.data;
            } else {
              vm.$router.replace({
                name: 'Fail',
                params: {
                  msg: res.data.msg || '未知错误'
                }
              });
            }
            vm.isLoading = false;
          });
        }
      },
      addComment: function () {
        var vm = this;
        if (vm.isComment) {
          vm.$message({
            message: '手速太快啦',
            type: 'warning'
          });
          return;
        }
        vm.isComment = true;
        vm.loginUser = this.$db.get('loginUser');
        var token = vm.loginUser ? vm.loginUser.token : null;
        if (token == null) {
          vm.$message({
            message: '需要登录才能评论呐',
            type: 'warning'
          });
          vm.isComment = false;
          return;
        }
        if (!vm.content.trim()) {
          vm.isComment = false;
          vm.$message({
            message: '请输入评论信息(＾Ｕ＾)ノ~ＹＯ',
            type: 'warning'
          });
          return;
        }
        vm.$http({
          url: 'api/comment/add',
          data: {parent: vm.$route.params.articleId, content: vm.content, type: 2},
          method: 'post',
          headers: {'content-type': 'application/json', 'authorT': token}
        }).then(function (res) {
          if (res.data.code == 200) {
            vm.$message({
              message: res.data.data,
              type: 'success'
            });
            var comment = {
              author: (vm.loginUser && vm.loginUser.name) || "匿名用户",
              authorAvator: (vm.loginUser && vm.loginUser.logo) || "/static/imgs/headimg/default.png",
              content: vm.content,
              date: vm.$util.getCurrentTime()
            };
            vm.article.comments.unshift(comment);
            vm.article.commentCount += 1;
            vm.content = '';
          } else {
            vm.$message({
              message: res.data.message,
              type: 'error'
            });
          }
          vm.isComment = false;
        });
      }
    },
    mounted: function () {
      this.getArticleAndComments();
    }
  };

</script>
<style lang="scss" scoped>
.description {
  margin: 20px 0;
  font-style: italic;
  color: #663399;
  text-align: right;
}
</style>
