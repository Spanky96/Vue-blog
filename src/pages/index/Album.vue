<template>
  <div class="album-content layer-photos-demo w1000"  id="layer-photos-demo" v-loading="isloading">
    <div class="img-info" v-if="albumPaganation[0]">
      <img :src="albumPaganation[0].photo" alt="">
      <div class="title">
        <p class="data">{{albumPaganation[0].date}}</p>
        <p class="address"><i class="layui-icon layui-icon-location"></i><span>{{albumPaganation[0].position}}</span></p>
        <p class="text">{{albumPaganation[0].briefly}}</p>
      </div>
    </div>
    <div class="img-list">
      <div class="layui-fluid" style="padding:0">
        <div class="layui-row space">
          <div class="album-box">
            <div class="item" v-for="(item, index) in albumPaganation.slice(1)" :key="index">
              <template v-if="item.id">
                <img :src="item.photo">
                <div class="cont-text">
                  <div class="data">{{item.date}}</div>
                  <p class="address"><i class="layui-icon layui-icon-location"></i><span>{{item.position}}</span></p>
                  <p class="briefly">{{item.briefly}}</p>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <el-pagination id="pagination"
        background
        layout="prev, pager, next"
        :pager-count="5"
        :page-size="10"
        :total="album.length"
        @current-change="handlePageChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import layui from 'layui';
  export default {
    data () {
      return {
        album: [],
        isloading: false,
        currentPage: 1
      };
    },
    methods: {
      handlePageChange: function (val) {
        this.currentPage = val;
      },
      getAlbums: function () {
        var vm = this;
        var blogId = vm.$parent.blogId;
        vm.isloading = true;
        vm.$http.post('api/album/list', vm.$util.stringify({
          userId: blogId
        })).then(function (res) {
          if (res.data.code == 200) {
            if (res.data.data.length) {
              vm.album = res.data.data;
            } 
          } else {
            vm.$message({
              message: res.data.message,
              type: 'warning'
            });
          }
          vm.isloading = false;
        });
      }
    },
    mounted: function () {
      layui.use(['layer'], function () {
        layui.layer.photos({
          photos: '#layer-photos-demo',
          anim: 5, // 0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
          tab: function (pic, layero) {
            console.log(pic, layero);
          }
        });
      });
      this.getAlbums();
    },
    computed: {
      albumPaganation: function () {
        var res = this.album.slice((this.currentPage - 1) * 10, this.currentPage * 10);
        var k = (res.length - 1) % 3;
        if (k) {
          for (let i = 0; i < k; i++) {
            res.push({});
          }
        }
        return res;
      }
    }
  };

</script>
<style lang="scss">
.album-content {
  .img-info {
    margin-top: 66px;
    overflow: hidden;
    font-size: 16px;
    margin-bottom: 36px;
    img {
      float: left;
      padding-right: 60px;
    }
    .title {
      line-height: 30px;
      margin-top: 124px;
      padding-left: 20px;
      .data {
        color: #ff7f21;
        span {
          padding-left: 35px;
        }
      }
    }
  }
  .img-list {
    overflow: hidden;
    padding-bottom: 50px;
    .item img {
      width: 100%;
    }
    .cont-text {
      padding-left: 10px;
      .data {
        line-height: 55px;
        color: #ff7f21;
      }
      .briefly {
        line-height: 24px;
        margin-top: 16px;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .img-list .briefly {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .album-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      width: 30%;
      margin-bottom: 25px;
      max-width: 240px;
      margin-right: 3%;
    }
  }
}
@media screen and (max-width: 768px) {
  .album-content {
    .img-info {
      overflow: hidden;
      width: 90%;
      margin: 36px auto 36px;
      font-size: 14px;
    }
  }
  .album-content img{
    max-width: 90%;
  }
  .album-box {
    .item {
      width: 90%;
      margin: 0 auto 20px;
    }
  }
}
</style>
