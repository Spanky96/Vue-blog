<template>
<div class="content whisper-content" v-loading="isloading">
  <div class="cont">
    <div class="whisper-list">
      <div class="item-box" v-for="(item, index) in whisperPage" :key="index">
        <div class="item">
          <div class="whisper-title">
            <i class="layui-icon layui-icon-date"></i><span class="hour">{{item.time}}</span><span class="date">{{item.date}}</span>
          </div>
          <p class="text-cont">
            {{item.content}}
          </p>
          <div class="img-box" :class="'__' + item.imgs.length">
            <img v-for="(img, idimg) in item.imgs" :key="idimg" :src="img">
          </div>
          <div class="op-list">
            <p class="like" @click="praiseWhisper(item.id)"><i class="layui-icon layui-icon-praise"></i><span>{{item.loveCount}}</span></p> 
            <p class="edit" @click="item.open = true;$forceUpdate();"><i class="layui-icon layui-icon-reply-fill"></i><span>{{item.commentCount}}</span></p>
            <p class="off" @click="item.open = !item.open; $forceUpdate();"><span>{{item.open ? '展开' : '收起'}}</span><i class="layui-icon" :class="item.open ? 'layui-icon-down' : 'layui-icon-up'"></i></p>
          </div>
        </div>
        <div class="review-version" :class="{'layui-hide': !item.open}">
          <div class="form">
            <img :src="$parent.loginUser.logo" v-if="$parent.loginUser" class="avator-img">
            <div class="layui-form" action="">
              <div class="layui-form-item layui-form-text">
                <div class="layui-input-block">
                  <textarea name="desc" class="layui-textarea" v-model="comment"></textarea>
                </div>
              </div>
              <div class="layui-form-item">
                <div class="layui-input-block" style="text-align: right;">
                  <button class="layui-btn definite" @click="commentWhisper(item)">確定</button>
                </div>
              </div>
            </div>
          </div>
          <div class="list-cont">
            <div class="cont" v-for="(comment, id) in item.comments" :key="id">
              <div class="img">
                <img :src="comment.authorAvator" alt="" class="avator-img">
              </div>
              <div class="text">
                <p class="tit"><span class="name">{{comment.author}}</span><span class="data">{{comment.date}}</span></p>
                <p class="ct">{{comment.content}}</p>
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
        :page-size="5"
        :total="total"
        :current-page="currentPage"
        @current-change="handlePageChange">
    </el-pagination>
  </div>
</div>
</template>
<script>
  export default {
    data () {
      var whispers = [];
      whispers.forEach((n) => {
        n.open = false;
      });
      return {
        whispers,
        currentPage: 1,
        total: 0,
        isloading: false,
        whisperItem: [],
        comment: '',
        isComment: false,
        isPraise: false
      };
    },
    methods: {
      handlePageChange: function (val) {
        this.currentPage = val;
      },
      getWhisper: function () {
        var vm = this;
        var blogId = vm.$parent.blogId;
        vm.isloading = true;
        vm.$http.post('api/whisper/list', vm.$util.stringify({
          usrId: blogId
        })).then(function (res) {
          if (res.data.code == 200) {
            vm.whispers = res.data.data;
            vm.total = res.data.data.length;
            vm.whispers.forEach((n) => {
              var tmpimg = n.imgs || '';
              n.imgs = vm.$util.split(tmpimg, ',');
              var createTime = n.createTime || '-- --';
              createTime = createTime.split(' ');
              n.date = createTime[0];
              n.time = createTime[1];
              n.open = false;
            });
          }
          vm.isloading = false;
        });
      },
      commentWhisper: function (item) {
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
        if (!vm.comment.trim()) {
          vm.isComment = false;
          vm.$message({
            message: '请输入评论信息(＾Ｕ＾)ノ~ＹＯ',
            type: 'warning'
          });
          return;
        }
        vm.$http({
          url: 'api/comment/add',
          data: {parent: item.id, content: vm.comment, type: 3},
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
              content: vm.comment,
              date: vm.$util.getCurrentTime()
            };
            item.comments.unshift(comment);
            item.commentCount += 1;
            vm.comment = '';
          } else {
            vm.$message({
              message: res.data.message,
              type: 'error'
            });
          }
          vm.isComment = false;
        });
      },
      praiseWhisper: function (i) {
        var vm = this;
        if (vm.isPraise) {
          vm.$message({
            message: '手速太快啦',
            type: 'warning'
          });
          return;
        }
        vm.isPraise = true;
        vm.loginUser = this.$db.get('loginUser');
        var token = vm.loginUser ? vm.loginUser.token : null;
        if (token == null) {
          vm.$message({
            message: '需要登录才能评论呐',
            type: 'warning'
          });
          vm.isPraise = false;
          return;
        }
        vm.$http({
          url: 'api/whisper/praise',
          data: vm.$util.stringify({whisperId: i}),
          method: 'post',
          headers: {'content-type': 'application/x-www-form-urlencoded', 'authorT': token}
        }).then(function (res) {
          if (res.data.code == 200) {
            var index = res.data.data;
            if (index == 1) {
              vm.$message({
                message: '点赞+' + index,
                type: 'success'
              });
            } else {
              vm.$message({
                message: '点赞失败',
                type: 'warning'
              });
            }
          } else {
            vm.$message({
              message: res.data.message,
              type: 'error'
            });
          }
          vm.isPraise = false;
        });
      }
    },
    mounted: function () {
      this.getWhisper();
    },
    computed: {
      whisperPage: function () {
        var vm = this;
        vm.whisperItem = vm.whispers.slice((vm.currentPage - 1) * 5, vm.currentPage * 5);
        return vm.whisperItem;
      }
    }
  };

</script>
<style lang="scss">
.img-box {
  display: flex;
  justify-content: space-evenly;
  &.__0 {
    display: none;
  }
  &.__2 {
    img {
      width: 48%;
      max-height: 258px;
      height: calc(48vw * 0.8);
      object-fit: cover;
    }
  }
  &.__3, &.__4, &.__5, &.__6, &.__7, &.__8, &.__9, &.__10 {
    img {
      width: 31.075%;
      max-height: 168px;
      height: calc(31vw * 0.8);
      object-fit: cover;
    }
  }
}
</style>
