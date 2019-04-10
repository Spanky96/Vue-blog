<template>
  <div class="errorPage">
    <div style="height:17vh;"></div>
    <div class="imgdiv">
      <img src="../assets/img/404.png" alt="">
      <div class="info">{{$route.params.msg}}</div>
    </div>
    <div class="extra">
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
    };
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
.errorPage {
  height: 100vh;
  background: #ffe6e6;
  .imgdiv {
    width: 95%;
    max-width: 540px;
    position: relative;
    margin: 0 auto;
    .info {
      position: absolute;
      left: 33%;
      top: 15%;
      color: #5a5959;
    }
    img {
      width: 100%;
    }
  }
}
</style>
