<template>
  <div class="login-wrapper">
    <h1 class="log-title">大学社团管理系统</h1>
    <div class="login" v-show="isLogin">
      <h2>登录</h2>
      <el-form :rules="rules" :model="login" ref="login">
        <el-form-item prop="userID">
          学号
          <el-input v-model="login.userID" type="text" placeholder="邮箱或者用户名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          密码
          <el-input v-model="login.passWord" type="password" placeholder="密码" show-password />
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
          <el-input v-model="register.userID" type="text" placeholder="学号" clearable />
        </el-form-item>
        <el-form-item prop="userName">
          <span class="txt">用户名</span>
          <el-input v-model="register.userName" type="text" placeholder="只能包含数字字母和下划线" clearable />
        </el-form-item>
        <el-form-item prop="passWord1">
          <span class="txt">密码</span>
          <el-input v-model="register.passWord1" type="password" placeholder="密码" show-password />
        </el-form-item>
        <el-form-item prop="passWord2">
          <span class="txt">再次输入密码</span>
          <el-input v-model="register.passWord2" type="password" placeholder="密码" show-password />
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
import { reqLogin, reqRegister, reqUserInfo } from "../api/index.js";
export default {
  data: function() {
    var checkID = (rule, value, callback) => {
      if (value === "admin") return callback();
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
      // console.log(value, this.register.passWord1);
      if (value !== this.register.passWord1) {
        return callback(new Error("两次输入的密码不一致"));
      }
      return callback();
    };
    return {
      register: {
        userID: "",
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
          { required: true, message: "请输入学号", trigger: "blur" },
          { validator: checkID, trigger: "blur" },
          { min: 5, max: 15, message: "请输入合法的学号", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
        passWord1: [{ required: true, message: "请输入密码", trigger: "blur" }],
        passWord2: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: checkPW, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitLog() {
      const { login } = this;
      this.$refs.login.validate(async valid => {
        if (!valid) return;
        const result = await reqLogin(login.userID, login.passWord);
        console.log(result);
        if (result.code === 1) {
          // console.log(this.$store.state.userInfo.userInfo)
          this.$router.push({ path: "/home" });
        } else {
          const msg = result.msg;
          this.$message.warning(result.msg);
        }
      });
    },
    submitReg() {
      const { register, isLogin } = this;
      this.$refs.register.validate(async valid => {
        if (!valid) return;
        const result = await reqRegister(
          register.userID,
          register.userName,
          register.passWord1
        );
        if (result.code === 1) {
          this.$message.success(result.msg);
          this.isLogin = true;
        } else {
          this.$message.warning(result.msg);
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