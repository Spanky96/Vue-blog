<template>
<div class="content whisper-content">
  <div class="cont">
    <div class="whisper-list">
      <div class="item-box" v-for="(item, index) in whispers" :key="index">
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
            <p class="off" @click="item.open = !item.open;"><span>{{item.open ? '展开' : '收起'}}</span><i class="layui-icon" :class="item.open ? 'layui-icon-down' : 'layui-icon-up'"></i></p>
          </div>
        </div>
        <div class="review-version" :class="{'layui-hide': !item.open}">
          <div class="form">
            <img :src="$parent.loginUser.logo" class="avator-img">
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
      :total="1000">
    </el-pagination>
  </div>
</div>
</template>
<script>
  export default {
    data () {
      var whispers = [
        {
          time: '12:25',
          date: '2018/06/08',
          content: '一直听说牛油果吃起来像肥皂、肥肉，虽然很难吃，但是价格却很贵，我还是想尝试一下。今天公司新到了新西兰牛油果，这是新西兰牛油果是第一次在中国上市，个头比普通牛油果大了一倍，被誉为“超牛果”。好奇心驱使我尝了一颗，第一次吃牛油果没有见识，切开牛油果费了好大劲，切成了这样。',
          imgs: [
            '/static/imgs/1551340747385.jpg'
          ],
          loveCount: '2000',
          commentCount: '1200',
          comments: [
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
          ]
        },
        {
          time: '12:25',
          date: '2018/06/08',
          content: '一直听说牛油果吃起来像肥皂、肥肉，虽然很难吃，但是价格却很贵，我还是想尝试一下。今天公司新到了新西兰牛油果，这是新西兰牛油果是第一次在中国上市，个头比普通牛油果大了一倍，被誉为“超牛果”。好奇心驱使我尝了一颗，第一次吃牛油果没有见识，切开牛油果费了好大劲，切成了这样。',
          imgs: [
            '/static/imgs/1551340747747.jpg',
            '/static/imgs/1551340747804.jpg',
            '/static/imgs/1551340747874.jpg'
          ],
          loveCount: '2000',
          commentCount: '1200',
          comments: [
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
          ]
        },
        {
          time: '12:25',
          date: '2018/06/08',
          content: '一直听说牛油果吃起来像肥皂、肥肉，虽然很难吃，但是价格却很贵，我还是想尝试一下。今天公司新到了新西兰牛油果，这是新西兰牛油果是第一次在中国上市，个头比普通牛油果大了一倍，被誉为“超牛果”。好奇心驱使我尝了一颗，第一次吃牛油果没有见识，切开牛油果费了好大劲，切成了这样。',
          imgs: [
            '/static/imgs/1551340747390.jpg', '/static/imgs/1551340748116.jpg'
          ],
          loveCount: '2000',
          commentCount: '1200',
          comments: [
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
          ]
        }
      ];
      whispers.forEach((n) => {
        n.open = false;
      });
      return {
        whispers
      };
    },
    methods: {
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
