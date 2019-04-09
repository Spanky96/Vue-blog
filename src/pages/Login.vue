<template>
  <div class="login-container pull-height full-screen">
    <div class="login-info"></div>
    <div class="login-border animated fadeInRight">
      <div class="login-main">
        <h4 class="login-title">欢&nbsp;迎&nbsp;登&nbsp;录
        </h4>
        <div class="el-tabs el-tabs--top">
          <div class="el-tabs__header is-top">
            <div class="el-tabs__nav-wrap is-top">
              <div class="el-tabs__nav-scroll">
                <div role="tablist" class="el-tabs__nav" style="transform: translateX(0px);">
                  <div class="el-tabs__active-bar is-top"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="el-tabs__content">
            <div class="userdenglu">
              <el-form :model="loginForm" status-icon size="small" class="login-form" :rules="rules" lable-width="0px" ref="loginForm">
                <el-form-item prop="username">
                  <el-input placeholder="请输入用户名" v-model="loginForm.username" prefix-icon="iconfont iconyonghu"></el-input>
                </el-form-item>
                <el-form-item prop="password" >
                  <el-input placeholder="请输入密码" class="password-input" :class="{'show-password': showPassword}" v-model="loginForm.password" prefix-icon="iconfont iconmima">
                    <i slot="suffix" class="el-icon-view" style="cursor:pointer;"  @click="showPassword = !showPassword;"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="validateCode">
                  <el-row :span="24">
                    <el-col :span="14">
                      <el-input placeholder="请输入验证码" v-model="loginForm.validateCode" prefix-icon="iconfont iconyanzhengma" maxlength="4"></el-input>
                    </el-col>
                    <el-col :span="10">
                      <div class="login-code"><span class="login-code-img" v-once>{{validateCode}}</span></div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit" class="login-submit">登 录</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    components: {},
    data () {
      if (this.$db.get('authorization')) {
        this.$router.push({path: '/'});
      }
      // 生成验证码
      var validateCode = parseInt(Math.random() * 10000);
      validateCode < 1000 && (validateCode += 1000);

      // 验证码校验脚本
      var codeValidate = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入验证码'));
        } else if (value !== validateCode) {
          callback(new Error('验证码不正确!'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: '',
          password: '',
          validateCode: validateCode
        },
        validateCode: validateCode,
        showPassword: false,
        rules: {
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
          validateCode: [{ validator: codeValidate, trigger: 'blur' }]
        }
      };
    },
    methods: {
      onSubmit: function () {
        var vm = this;
        vm.$refs['loginForm'].validate((valid) => {
          if (valid) {
            vm.$http.post('api/user/login', vm.$util.stringify({
                account: vm.loginForm.username,
                password: vm.loginForm.password
              })).then(function (res) {
              if (res.data.code == 200) {
                vm.$db.set('loginUser', res.data.data);
                vm.$router.push({path: '/'});
              } else {
                vm.loginForm.password = '';
                vm.$message({
                  message: res.data.message || '登录失败',
                  type: 'error'
                });
              }
            });
          }
        });
      }
    }
  };
</script>

<style lang="scss">
.full-screen {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

.password-input {
  input {
    -webkit-text-security: disc;
  }
}
.show-password {
  input {
  -webkit-text-security: unset;
  }
}
.login-container {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  background: rgba(0, 0, 0, 0.2);
  &:before {
    z-index: -999;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/bg.png);
    background-size: cover;
  }
  .login-border {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-direction: column;
    flex-direction: column;
    padding: 30px 50px 25px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 1px 1px 2px #eee;
  }

  .login-main {
    border-radius: 3px;
    box-sizing: border-box;
    background-color: #fff;
    > {
      h3 {
        margin-bottom: 20px;
      }
      p {
        color: #76838f;
      }
    }
  }

  .login-title {
    margin: 0;
    text-align: center;
    color: #409eff;
    letter-spacing: 3px;
  }

  .login-submit {
    width: 100%;
    border-radius: 28px;
  }

  .login-form {
    margin: 10px 0;
    .el-form-item__content {
      width: 270px;
    }
    .el-form-item {
      margin-bottom: 18px;
    }
    .el-input {
      input {
        text-indent: 5px;
        border-color: #dcdcdc;
        border-radius: 3px;
      }
      .el-input__prefix i {
        padding: 0 5px;
        font-size: 16px !important;
      }
    }
  }

  .login-code {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    margin: 0 0 0 10px;
  }

  .login-code-img {
    width: 100px;
    height: 32px;
    background-color: #fdfdfd;
    border: 1px solid #f0f0f0;
    color: #333;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 5px;
    line-height: 32px;
    text-indent: 5px;
    text-align: center;
  }

  .userdenglu .el-loading-mask {
    background: hsla(0, 0%, 100%, 0);
    top: 94%;
    left: 18%;
    .el-loading-spinner .icon-jiazailoading-B {
      animation: rotating 2s linear infinite;
      color: #fff;
      font-size: 12px;
    }
  }
}
</style>
