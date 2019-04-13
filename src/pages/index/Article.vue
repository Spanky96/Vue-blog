<template>
  <div>
    <div class="banner">
      <div class="cont w1000">
        <div class="title">
          <h3 id="user_nickName1">MY<br />BLOG</h3>
          <h4 id="user_sign">{{$parent.blogInfo.sign}}</h4>
        </div>
        <div class="amount">
          <p><span class="text" id="user_visit_count">访问量</span><span class="access">{{$parent.blogInfo.visitCount}}</span></p>
          <!-- <p><span class="text" id="user_">日志</span><span class="daily-record">1000</span></p> -->
        </div>
      </div>
    </div>
    <div class="content">
      <div class="cont w1000">
        <div class="content-tabs" v-if="categorys.length > 1">
          <div class="tabs" v-for="(c, id) in categorys" :key="id" :class="{active: c.active}" @click="categoryClick(id)">{{c.name}}</div>
        </div>
        <div class="list-item" v-loading="isloading">
          <div class="item" v-for="(item, index) in articleListCategoryed" :key="index">
            <div class="layui-fluid">
              <div class="layui-row">
                <div class="layui-col-xs12 layui-col-sm4 layui-col-md5">
                  <div class="img"><img :src="item.banner" alt=""></div>
                </div>
                <div class="layui-col-xs12 layui-col-sm8 layui-col-md7">
                  <div class="item-cont">
                    <!-- <button class="layui-btn layui-btn-danger new-icon">new</button> -->
                    <h3 class="title"><router-link :to="{name: 'ArticleDetail', params: {id: $parent.blogId, articleId: item.id, article: item}}">{{item.title}}</router-link></h3>
                    <h5><div>{{item.categoryName}}</div><div>{{item.createTime}}</div></h5>
                    <p>{{item.content | deleteHtmlTag}}</p>
                    <h4>{{item.description}}</h4>
                    <!-- <router-link to="/page/details" class="go-icon"></router-link> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页器Doc.😊 http://element.eleme.io/#/zh-CN/component/pagination 😊-->
        <el-pagination id="pagination"
          background
          layout="prev, pager, next"
          :pager-count="5"
          :page-size="5"
          :total="total"
          :current-page="currentPage"
          @current-change="handlePageChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import _ from 'lodash';
  export default {
    data () {
      return {
        categorys: [{name: '全部', active: true}],
        articleList: [],
        currentPage: 1,
        total: 0,
        isloading: false
      };
    },
    methods: {
      handlePageChange: function (val) {
        this.currentPage = val;
      },
      categoryClick: function (id) {
        var vm = this;
        if (!vm.categorys[id].active) {
          vm.categorys.forEach((item, index) => {
            item.active = index == id;
          });
          vm.currentPage = 1;
          vm.total = (id == 0 ? vm.articleList.length : vm.categorys[id].total);
        }
      },
      getArticles: function () {
        var vm = this;
        var blogId = vm.$parent.blogId;
        vm.isloading = true;
        vm.$http.post('api/article/list', vm.$util.stringify({
          usrId: blogId
        })).then(function (res) {
          if (res.data.code == 200) {
            vm.articleList = res.data.data;
            vm.total = res.data.data.length;
            var categorys = _.groupBy(res.data.data, 'categoryName');
            Object.keys(categorys).forEach((n) => {
              vm.categorys.push(
                {name: n, active: false, total: categorys[n].length}
              );
            });
          }
          vm.isloading = false;
        });
      }
    },
    mounted: function () {
      this.getArticles();
    },
    computed: {
      articleListCategoryed: function () {
        var vm = this;
        var i = _.findIndex(vm.categorys, (n) => n.active);
        if (i) {
          return _.filter(vm.articleList, (n) => n.categoryName == this.categorys[i].name).slice((vm.currentPage - 1) * 5, vm.currentPage * 5);
        } else {
          return vm.articleList.slice((vm.currentPage - 1) * 5, vm.currentPage * 5);
        }
      }
    }
  };

</script>
<style lang="scss">
</style>
