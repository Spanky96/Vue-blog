<template>
  <div class="content whisper-content leacots-content">
    <div class="cont w1000">
      <div class="whisper-list">
        <div class="item-box">
          <div class="review-version">
              <div class="form-box">
                <img class="banner-img" src="../../assets/img/liuyan.jpg">
                <div class="form">
                  <div class="layui-form">
                    <div class="layui-form-item layui-form-text">
                      <div class="layui-input-block">
                        <textarea name="desc" v-model="content" placeholder="既然来了，就说几句" class="layui-textarea"></textarea>
                      </div>
                    </div>
                    <div class="layui-form-item">
                      <div class="layui-input-block" style="text-align: right;">
                        <button class="layui-btn definite" @click="addMessage">確定</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="volume">
                全部留言 <span>{{leacotList.length ? leacotList.length : ''}}</span>
              </div>
              <div class="list-cont" v-loading="isloading">
                <div class="cont" v-for="(item, id) in leacotListPaganation" :key="id">
                  <div class="img">
                    <img :src="item.authorLogo" alt="" class="avator-img">
                  </div>
                  <div class="text">
                    <p class="tit"><span class="name">{{item.authorName}}</span><span class="data">{{item.createTime}}</span></p>
                    <p class="ct">{{item.content}}</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <el-pagination id="pagination"
        background
        layout="prev, pager, next"
        :pager-count="5"
        :total="leacotList.length"
        @current-change="handlePageChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        leacotList: [],
        currentPage: 1,
        isloading: false,
        content: '',
        isAdd: false
      };
    },
    methods: {
      getLeacotList: function () {
        var vm = this;
        var blogId = vm.$parent.blogId;
        vm.isloading = true;
        vm.$http.post('api/message/list', vm.$util.stringify({
          usrId: blogId
        })).then(function (res) {
          if (res.data.code == 200) {
            vm.leacotList = res.data.data;
          }
          vm.isloading = false;
        });
      },
      handlePageChange: function (val) {
        this.currentPage = val;
      },
      addMessage: function () {
        var vm = this;
        if (vm.isAdd) {
          return;
        }
        vm.isAdd = true;
        if (!vm.content.trim()) {
          vm.isAdd = false;
          vm.$message({
            message: '请输入留言信息(＾Ｕ＾)ノ~ＹＯ',
            type: 'warning'
          });
          return;
        }
        vm.loginUser = this.$db.get('loginUser');
        var blogId = vm.$parent.blogId;
        var token = vm.loginUser ? vm.loginUser.token : null;
        vm.$http({
            url: 'api/message/add',
            data: {user: blogId, content: vm.content},
            method: 'post',
            headers: {'content-type': 'application/json', 'authorT': token}
          }).then(function (res) {
          if (res.data.code == 200) {
            vm.$message({
              message: res.data.data,
              type: 'success'
            });
            var item = {
              author: (vm.loginUser && vm.loginUser.id) || -1,
              authorLogo: (vm.loginUser && vm.loginUser.logo) || "/static/imgs/headimg/default.png",
              authorName: (vm.loginUser && vm.loginUser.name) || "匿名用户",
              content: vm.content,
              createTime: vm.$util.getCurrentTime(),
              id: new Date().getTime(),
              user: blogId
            };
            vm.leacotList.unshift(item);
            vm.content = '';
          } else {
            vm.$message({
              message: '出错咯，(づ￣3￣)づ╭❤～',
              type: 'error'
            });
          }
          vm.isAdd = false;
        });
      }
    },
    mounted: function () {
      this.getLeacotList();
    },
    computed: {
      leacotListPaganation: function () {
        return this.leacotList.slice((this.currentPage - 1) * 10, this.currentPage * 10);
      }
    }
  };

</script>
<style lang="scss" scoped>
.list-cont {
  min-height: 60px;
}

</style>
