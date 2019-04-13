<template>
  <div class="album-content layer-photos-demo w1000"  id="layer-photos-demo">
    <div class="img-info">
      <img :src="album.top.photo" alt="">
      <div class="title">
        <p class="data">{{album.top.more}}<span>{{album.top.date}}</span></p>
        <p class="text">{{album.top.briefly}}</p>
      </div>
    </div>
    <div class="img-list">
      <div class="layui-fluid" style="padding:0">
        <div class="layui-row layui-col-space30 space">
          <div class="layui-col-xs12 layui-col-sm4 layui-col-md4" v-for="(item, index) in albumPaganation" :key="index">
            <div class="item">
              <img :src="item.photo">
              <div class="cont-text">
                <div class="data">{{item.date}}</div>
                <p class="address"><i class="layui-icon layui-icon-location"></i><span>{{item.position}}</span></p>
                <p class="briefly">{{item.briefly}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-pagination id="pagination"
        background
        layout="prev, pager, next"
        :pager-count="5"
        :total="album.items.length"
        @current-change="handlePageChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import layui from 'layui';
  export default {
    data () {
      var album = {
        top: {},
        items: []
      };
      return {
        album,
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
            vm.album.items = res.data.data;
          } else {
            vm.$message({
              message: res.data.message,
              type: 'warning'
            });
          }
          vm.isloading = false;
        });
      },
      getLastAlbum: function () {
        var vm = this;
        var blogId = vm.$parent.blogId;
        vm.$http.post('api/album/last', vm.$util.stringify({
          userId: blogId
        })).then(function (res) {
          if (res.data.code == 200) {
            vm.album.top = res.data.data || {};
          } else {
            vm.$message({
              message: res.data.message,
              type: 'warning'
            });
          }
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
      this.getLastAlbum();
      this.getAlbums();
    },
    computed: {
      albumPaganation: function () {
        return this.album.items.slice((this.currentPage - 1) * 10, this.currentPage * 10);
      }
    }
  };

</script>
<style lang="scss">

</style>
