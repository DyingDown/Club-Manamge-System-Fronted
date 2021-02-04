<template>
  <div class="login-wrapper">
    <h1 class="log-title">大学社团管理系统</h1>
    <div class="login" v-show="isLogin">
      <h2>登录</h2>
      <el-form :rules="rules" :model="login" ref="login">
        <el-form-item prop="userID">
          学号
          <el-input v-model="login.userID" type="text" placeholder="邮箱或者用户名"></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          密码
          <el-input v-model="login.passWord" type="password" placeholder="密码" show-password/>
        </el-form-item>
        <el-button class="log-btn" type="primary" @click="submitLog">登录</el-button>
      </el-form>
      <div class="creates">
        没有帐户?
        <a href @click.stop.prevent="changeView">创建一个</a>
      </div>
    </div>
    <div class="register" v-show="!isLogin">
      <h2>注册</h2>
      <el-form :rules="rules" :model="register" ref="register">
        <el-form-item prop="userID">
          <span class="txt">学号</span>
          <el-input v-model="register.userID" type="text" placeholder="学号" />
        </el-form-item>
        <el-form-item prop="userName">
          <span class="txt">用户名</span>
          <el-input v-model="register.userName" type="text" placeholder="只能包含数字字母和下划线" />
        </el-form-item>
        <el-form-item prop="passWord1">
          <span class="txt">密码</span>
          <el-input v-model="register.passWord1" type="password" placeholder="密码" show-password/>
        </el-form-item>
        <el-form-item prop="passWord2">
          <span class="txt">再次输入密码</span>
          <el-input v-model="register.passWord2" type="password" placeholder="密码" show-password/>
        </el-form-item>
        <el-button class="log-btn" type="primary" @click="submitReg">注册</el-button>
      </el-form>
      <div class="creates">
        已有帐户?
        <a href @click.stop.prevent="changeView">去登录</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    var checkID = (rule, value, callback) => {
      const idReg = /^[1-9][0-9]*$/;
      if (!value) {
        return callback(new Error("学号不能为空"));
      }
      if (!idReg.test(value)) {
        return callback(new Error("学号格式不正确"));
      }
      return callback();
    };
    var checkPW = (rule, value, callback) => {
      console.log(value, this.register.passWord1);
      if (value !== this.register.passWord1) {
        return callback(new Error("两次输入的密码不一致"));
      }
    };
    return {
      register: {
        userID: "",
        eMail: "",
        phone: "",
        passWord1: "",
        passWord2: "",
        userName: ""
      },
      login: {
        userID: "",
        passWord: ""
      },
      isLogin: true,
      rules: {
        userID: [
          {
            required: true,
            message: "请输入学号",
            trigger: "blur"
          },
          {
            validator: checkID,
            trigger: "blur"
          },
          {
            min: 6,
            max: 15,
            message: "请输入合法的学号",
            trigger: "blur"
          }
        ],
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        passWord: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        passWord1: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        passWord2: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            validator: checkPW,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitLog() {
      // this.$router.push({path:'/home'})
      this.$refs.login.validate(valid => {
        if (!valid) return;
        this.$router.push({path:'/home'})
      })
    },
    submitReg() {
      this.$refs.register.validate(vaild => {
        console.log(valid)
        if (vaild) {
          let flag = 0;
          this.$axios
            .post("/user", {
              userID: this.reg.userID
            })
            .then(response => {
              if (response.data != null) {
                this.$message.error("该用户已存在");
                flag = 1;
              }
            });
          if (flag === 0) {
            let date = new Date().getTime();
            this.$axios
              .post("/users", {
                userID: this.reg.userID,
                password: this.reg.password1,
                userLogo: this.reg.userLogo,
                regtime: date
              })
              .then(response => {
                if (response.status === 200) {
                  this.regVisible = false;
                  this.$message.success("注册成功");
                }
              })
              .catch(function(error) {});
          }
        } else {
          return false;
        }
      });
    },
    changeView() {
      this.isLogin = !this.isLogin;
    }
  }
};
</script>

<style lang="stylus" scoped>
body {
  position: relative;
}

.login-wrapper {
  width: 40%;
  margin: auto;
  vertical-align: middle;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 250px;
}

.log-btn {
  width: 100%;
  margin: 15px 0;
}

.log-title {
  text-align: center;
}

.creates {
  padding: 15px 0;
  text-align: center;
}

.el-form-item__content {
  line-height: 14px !important;
}
</style>