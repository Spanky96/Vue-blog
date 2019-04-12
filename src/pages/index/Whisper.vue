<template>
<div class="content whisper-content">
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
            <p class="like"><i class="layui-icon layui-icon-praise"></i><span>{{item.loveCount}}</span></p> 
            <p class="edit"><i class="layui-icon layui-icon-reply-fill"></i><span>{{item.commentCount}}</span></p>
            <p class="off" @click="handleComment(index,!item.open)"><span>{{item.open ? '展开' : '收起'}}</span><i class="layui-icon" :class="item.open ? 'layui-icon-down' : 'layui-icon-up'"></i></p>
          </div>
        </div>
        <div class="review-version" :class="{'layui-hide': !item.open}">
          <div class="form">
            <img :src="$parent.loginUser.logo" v-if="$parent.loginUser" class="avator-img">
            <form class="layui-form" action="">
              <div class="layui-form-item layui-form-text">
                <div class="layui-input-block">
                  <textarea name="desc" class="layui-textarea"></textarea>
                </div>
              </div>
              <div class="layui-form-item">
                <div class="layui-input-block" style="text-align: right;">
                  <button class="layui-btn definite">確定</button>
                </div>
              </div>
            </form>
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
        :page-sizes="5"
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
        whisperItem: []
      };
    },
    methods: {
      handlePageChange: function (val) {
        this.currentPage = val;
      },
      getWhisper: function () {
        var vm = this;
        var blogId = vm.$parent.blogId;
        vm.$http.post('api/whisper/list', vm.$util.stringify({
          usrId: blogId
        })).then(function (res) {
          if (res.data.code == 200) {
            vm.whispers = res.data.data;
            vm.total = res.data.data.length;
            vm.whispers.forEach((n) => {
              var tmpimg = n.imgs || "";
              n.imgs = tmpimg.split(",");
              var createTime = n.createTime || "2019-01-01 12:40:52";
              createTime = createTime.split(" ");
              n.date = createTime[0];
              n.time = createTime[1];
              n.open = false;
            });
          }
          vm.isloading = false;
        });
      },
      handleComment: function (i, v) {
        console.log(i, v);
        this.whisperItem[i].open = v;
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
  &.__3 {
    img {
      width: 31.075%;
      max-height: 168px;
      height: calc(31vw * 0.8);
      object-fit: cover;
    }
  }
}
</style>
