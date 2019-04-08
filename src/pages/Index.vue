<template>
  <div>
    <div class="header">
      <div class="menu-btn">
        <div class="menu"></div>
      </div>
      <h1 class="logo">
        <router-link to="/">
          <span>MYBLOG</span>
          <img src="../assets/img/logo.png">
        </router-link>
      </h1>
      <div class="nav">
        <router-link v-for="(item, index) in menus" :key="index" :to="item.path" :class="{active: item.active}">{{item.name}}</router-link>
      </div>
      <ul class="layui-nav header-down-nav">
        <li v-for="(item, index) in menus" :key="index" class="layui-nav-item">
          <router-link :to="item.path" :class="{active: item.active}">{{item.name}}</router-link>
        </li>
      </ul>
      <p class="welcome-text">
        <span v-if="loginUser">你好{{loginUser.name}}!</span>
        <span class="name">欢迎来到我的博客~</span>
      </p>
    </div>
    <router-view></router-view>
    <div class="footer-wrap">
      <div class="footer w1000">
        <div class="qrcode">
          <qriously value="https://github.com/Spanky96" :size="200"/>
        </div>
        <div class="practice-mode">
          <img src="../assets/img/down_img.jpg">
          <div class="text">
            <h4 class="title">我的联系方式</h4>
            <p>
              微信
              <span class="WeChat">1234567890</span>
            </p>
            <p>
              手机
              <span class="iphone">1234567890</span>
            </p>
            <p>
              邮箱
              <span class="email">1234567890@qq.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import layui from 'layui';   
export default {
  data () {
    this.loginUser = this.$db.get('loginUser');
    var activeItem = this.$router.currentRoute.name;
    var menus = [
      {name: '文章', component: 'Article', path: '/page/article', active: false},
      {name: '微语', component: 'Whisper', path: '/page/whisper', active: false},
      {name: '留言', component: 'Leacots', path: '/page/leacots', active: false},
      {name: '相册', component: 'Album', path: '/page/album', active: false},
      {name: '关于', component: 'About', path: '/page/about', active: false}
    ];
    menus.forEach((n) => {
      n.active = activeItem == n.component;
    });
    return {
      menus
    };
  },
  methods: {},
  mounted: function () {
    var vm = this;
    vm.$router.afterEach((to, from) => {
      var activeItem = to.name;
      vm.menus.forEach((n) => {
        n.active = activeItem == n.component;
      });
    });
    layui.config({
      base: '/static/layui/util/'
    }).use(['element', 'menu'], function () {
      layui.menu.init();
    });
  }
};
</script>
<style lang="scss">

</style>
