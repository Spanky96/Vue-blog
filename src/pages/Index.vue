<template>
  <div>
    <div class="header">
      <div class="menu-btn">
        <div class="menu"></div>
      </div>
      <h1 class="logo">
        <router-link :to="'/' + $route.params.id">
          <span>MYBLOG</span>
          <img src="../assets/img/logo.png">
        </router-link>
      </h1>
      <div class="nav">
        <router-link v-for="(item, index) in menus" :key="index" :to="'/' + $route.params.id + item.path" :class="{active: item.active}">{{item.name}}</router-link>
      </div>
      <ul class="layui-nav header-down-nav">
        <li v-for="(item, index) in menus" :key="index" class="layui-nav-item">
          <router-link :to="'/' + $route.params.id + item.path" :class="{active: item.active}">{{item.name}}</router-link>
        </li>
      </ul>
      <p class="welcome-text">
        <span v-if="loginUser">你好{{loginUser.name}}!</span>
        <span class="name">欢迎来到我的博客~</span>
      </p>
      <p class="login-out">
        <span @click="loginOut">{{loginUser ? '退出': ''}}登录</span>
      </p>
    </div>
    <router-view v-if="blogInfo"></router-view>
    <div class="footer-wrap" v-if="blogInfo">
      <div class="footer w1000">
        <div class="qrcode">
          <qriously :value="indexLocation" :size="150"/>
        </div>
        <div class="practice-mode">
          <img src="../assets/img/down_img.jpg">
          <div class="text">
            <h4 class="title">我的联系方式</h4>
            <div>
              <div v-for="(item, index) in contactInfo" :key="index" class="contactInfo">
                <div class="k">{{index}}</div>
                <div class="v">{{item}}</div>
              </div>
              <p v-if="$util.isEmpty(contactInfo)">博主没有留下任何联系方式</p>
            </div>
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
    var vm = this;
    vm.loginUser = this.$db.get('loginUser');
    vm.$router.afterEach((to, from) => {
      var activeItem = to.name;
      vm.menus.forEach((n) => {
        n.active = activeItem == n.component;
      });
    });
    var blogId = vm.$route.params.id;
    vm.getBlogInfo();
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
      blogId,
      menus,
      blogInfo: ''
    };
  },
  methods: {
    getBlogInfo: function () {
      var vm = this;
      var blogId = vm.$route.params.id;
      vm.$http.post('api/user/basicinfo', vm.$util.stringify({
          id: blogId
        })).then(function (res) {
        if (res.data.code == 200) {
          vm.blogInfo = res.data.data;
        } else {
          vm.$router.replace({
            name: 'Fail',
            params: {
              msg: '无效的博主空间～'
            }
          });
        }
      });
    },
    loginOut: function () {
      if (this.loginUser) {
        this.loginUser = null;
        this.$db.remove('loginUser');
        location.reload();
      } else {
        this.$router.push({name: 'Login'});
      }
    }
  },
  computed: {
    contactInfo: function () {
      var vm = this;
      const KVS = {
        'qq': 'QQ',
        'weixin': "微信",
        'phone': '电话',
        'email': '邮箱'
      };
      var obj = {};
      Object.keys(KVS).forEach((n) => {
        obj[KVS[n]] = vm.blogInfo[n];
      });
      return obj;
    },
    indexLocation: function () {
      return 'http://' + location.host + '/#/' + this.blogId;
    }
  },
  mounted: function () {
    layui.config({
      base: '/static/layui/util/'
    }).use(['element', 'menu'], function () {
      layui.menu.init();
    });
  },
  watch: {
    $route: function () {
      this.blogId = this.$route.params.id;
    },
    blogId: function () {
      location.reload();
    }
  }
};
</script>
<style lang="scss" scoped>
.login-out {
  position: absolute;
  right: 50px;
  top: 32px;
  color: #068585;
  text-decoration: underline;
  cursor: pointer;
}
.contactInfo {
  display: flex;
  line-height: 24px;
  .k {
    min-width: 45px;
  }
}
</style>
