<template>
  <div class="about-content">
    <div class="w1000">
      <div class="item info">
        <div class="title">
          <h3>我的介绍</h3>
        </div>
        <div class="cont">
          <img :src="info.weixinPic">
          <div class="per-info">
            <p>
              <span class="name">{{info.nickName}}</span><br />
              <span class="age">{{info.age}}岁 {{info.sex | genderFmt}}</span><br />
              <span class="Career">{{info.major}}, {{info.job}}</span><br />
              <span class="interest">{{info.hobby}}</span><br />
              <span class="interest">{{info.sign}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="item tool">
        <div class="title">
          <h3>我的技能</h3>
        </div>
        <div class="layui-fluid">
          <div class="layui-row">
            <div class="layui-col-xs6 layui-col-sm3 layui-col-md3">
              <div class="cont-box">
                <img src="../../assets/img/gr_img2.jpg">
                <p>80%</p>
              </div>
            </div>
            <div class="layui-col-xs6 layui-col-sm3 layui-col-md3">
              <div class="cont-box">
                <img src="../../assets/img/gr_img3.jpg">
                <p>80%</p>
              </div>
            </div>
            <div class="layui-col-xs6 layui-col-sm3 layui-col-md3">
              <div class="cont-box">
                <img src="../../assets/img/gr_img4.jpg">
                <p>80%</p>
              </div>
            </div>
            <div class="layui-col-xs6 layui-col-sm3 layui-col-md3">
              <div class="cont-box">
                <img src="../../assets/img/gr_img5.jpg">
                <p>80%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item contact">
        <div class="title">
          <h3>联系方式</h3>
        </div>
        <div class="cont">
          <!-- <qriously value="https://u.wechat.com/EGz2jw8V3yYzC5VT2iMz2Os" :size="200"/> -->
          <div class="text">
            <div v-for="(item, index) in $parent.contactInfo" :key="index" class="contactInfo">
              <div class="k">{{index}}</div>
              <div class="v">{{item}}</div>
            </div>
            <!-- <p class="WeChat">微信：<span>1234567890</span></p>
            <p class="qq">qq：<span>123456789</span></p>
            <p class="iphone">电话：<span>123456789</span></p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      var info = this.$parent.blogInfo;
      return {
        info
      };
    },
    methods: {
    }
  };

</script>
<style lang="scss" scoped>
.contactInfo {
  display: flex;
  line-height: 30px;
  font-size: 15px;
  .k {
    min-width: 45px;
  }
}
</style>
