<template>
  <div class="content whisper-content leacots-content">
    <div class="cont w1000">
      <div class="whisper-list">
        <div class="item-box">
          <div class="review-version">
              <div class="form-box">
                <img class="banner-img" src="../../assets/img/liuyan.jpg">
                <div class="form">
                  <form class="layui-form" action="">
                    <div class="layui-form-item layui-form-text">
                      <div class="layui-input-block">
                        <textarea name="desc" placeholder="既然来了，就说几句" class="layui-textarea"></textarea>
                      </div>
                    </div>
                    <div class="layui-form-item">
                      <div class="layui-input-block" style="text-align: right;">
                        <button class="layui-btn definite">確定</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="volume">
                全部留言 <span>{{comments.length}}</span>
              </div>
              <div class="list-cont">        
                <div class="cont" v-for="(item, id) in comments" :key="id">
                  <div class="img">
                    <img :src="item.authorAvator" alt="" class="avator-img">
                  </div>
                  <div class="text">
                    <p class="tit"><span class="name">{{item.author}}</span><span class="data">{{item.date}}</span></p>
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
        :total="3">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      var comments = [
        {
          authorAvator: '/static/imgs/1551340748226.jpg',
          author: '吴亦凡',
          date: '2018/06/29',
          content: '敢问大师，师从何方？上古高人呐逐一地看完你的作品后，我的心久久 不能平静！这世间怎么可能还有如此精辟的作品？我不敢相信自己的眼睛。自从改革开放以后，我就以为再也不会有任何作品能打动我，没想到今天看到这个如此精妙绝伦的作品好厉害！'
        },
        {
          authorAvator: '/static/imgs/1551340748226.jpg',
          author: '吴亦凡',
          date: '2018/06/29',
          content: '敢问大师，师从何方？上古高人呐逐一地看完你的作品后，我的心久久 不能平静！这世间怎么可能还有如此精辟的作品？我不敢相信自己的眼睛。自从改革开放以后，我就以为再也不会有任何作品能打动我，没想到今天看到这个如此精妙绝伦的作品好厉害！'
        },
        {
          authorAvator: '/static/imgs/1551340748226.jpg',
          author: '吴亦凡',
          date: '2018/06/29',
          content: '敢问大师，师从何方？上古高人呐逐一地看完你的作品后，我的心久久 不能平静！这世间怎么可能还有如此精辟的作品？我不敢相信自己的眼睛。自从改革开放以后，我就以为再也不会有任何作品能打动我，没想到今天看到这个如此精妙绝伦的作品好厉害！'
        }
      ];
      return {
        comments
      };
    },
    methods: {
    }
  };

</script>
<style lang="scss">

</style>
