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
          <div class="layui-col-xs12 layui-col-sm4 layui-col-md4" v-for="(item, index) in album.items" :key="index">
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
        :total="3">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import layui from 'layui';
  export default {
    data () {
      var album = {
        top: {
          photo: '/static/imgs/1551340747385.jpg',
          date: '2018/08/08',
          more: '最新上传',
          briefly: '观赏最美的土耳其的日'
        },
        items: [
          {
            photo: '/static/imgs/1551340747388.jpg',
            date: '2018/08/08',
            position: '江西九江',
            briefly: '今日天气晴朗,庐山一日游'
          },
          {
            photo: '/static/imgs/1551340747389.jpg',
            date: '2018/08/08',
            position: '江西九江',
            briefly: '今日天气晴朗,庐山一日游'
          },
          {
            photo: '/static/imgs/1551340747390.jpg',
            date: '2018/08/08',
            position: '江西九江',
            briefly: '今日天气晴朗,庐山一日游'
          },
          {
            photo: '/static/imgs/1551340747391.jpg',
            date: '2018/08/08',
            position: '江西九江',
            briefly: '今日天气晴朗,庐山一日游'
          },
          {
            photo: '/static/imgs/1551340747392.jpg',
            date: '2018/08/08',
            position: '江西九江',
            briefly: '今日天气晴朗,庐山一日游'
          },
          {
            photo: '/static/imgs/1551340747555.jpg',
            date: '2018/08/08',
            position: '江西九江',
            briefly: '今日天气晴朗,庐山一日游'
          },
          {
            photo: '/static/imgs/1551340747624.jpg',
            date: '2018/08/08',
            position: '江西九江',
            briefly: '今日天气晴朗,庐山一日游'
          },
          {
            photo: '/static/imgs/1551340747695.jpg',
            date: '2018/08/08',
            position: '江西九江',
            briefly: '今日天气晴朗,庐山一日游'
          },
          {
            photo: '/static/imgs/1551340747747.jpg',
            date: '2018/08/08',
            position: '江西九江',
            briefly: '今日天气晴朗,庐山一日游'
          },
          {
            photo: '/static/imgs/1551340747804.jpg',
            date: '2018/08/08',
            position: '江西九江',
            briefly: '今日天气晴朗,庐山一日游'
          },
          {
            photo: '/static/imgs/1551340747874.jpg',
            date: '2018/08/08',
            position: '江西九江',
            briefly: '今日天气晴朗,庐山一日游'
          },
          {
            photo: '/static/imgs/1551340747967.jpg',
            date: '2018/08/08',
            position: '江西九江',
            briefly: '今日天气晴朗,庐山一日游'
          }
        ]
      };
      return {
        album
      };
    },
    methods: {
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
    }
  };

</script>
<style lang="scss">

</style>
