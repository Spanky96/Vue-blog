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
      <div class="item tool" v-if="skillList.length">
        <div class="title">
          <h3>我的技能</h3>
        </div>
        <div class="layui-fluid">
          <div class="layui-row">
            <div class="layui-col-xs6 layui-col-sm3 layui-col-md3" v-for="(item, index) in skillList" :key="index">
              <div class="cont-box">
                <img :src="item.img">
                <el-progress type="circle" :percentage="item.poficiency" :width="140" class="processBar"></el-progress>
                <div class="name">{{item.content}}</div>
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
        info,
        skillList: []
      };
    },
    methods: {
      getSkillList: function () {
        var vm = this;
        var blogId = vm.$parent.blogId;
        vm.$http.post('api/skill/list', vm.$util.stringify({
          usrId: blogId
        })).then(function (res) {
        if (res.data.code == 200) {
          vm.skillList = res.data.data.sort((n, n2) => n.sort - n2.sort);
        }
      });
      }
    },
    mounted: function () {
      this.getSkillList();
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

.cont-box {
  position: relative;
  height: 150px;
  margin-top: 25px;
  margin-bottom: 15px;
  img {
    width: 80px;
    height: 80px;
    padding-top: 25px;
    border-radius: 35px;
  }
  .processBar {
    position: absolute;
    left: calc(50% - 70px);
    top: 0;
    /deep/.el-progress--circle .el-progress__text {
      top: 84%;
    }
  }
  .name {
    position: absolute;
    top: -28px;
    font-size: 16px;
    left: 0;
    right: 0;
    color: #8c0d81;
    font-weight: bold;
  }
}
</style>
