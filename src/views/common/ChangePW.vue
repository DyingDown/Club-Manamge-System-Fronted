<template>
  <el-scrollbar>
    <el-main>
      <div content="修改密码">修改密码</div>
      <el-divider></el-divider>
      <el-form :rules="rules" ref="userInfo" :model="userInfo">
        <el-form-item prop="originalPW">
          <el-input
            class="username"
            type="password"
            placeholder="输入原密码"
            v-model="userInfo.originalPW"
            show-password
          >
            <template slot="prepend">原始密码</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="newPW">
          <el-input
            class="username"
            type="password"
            placeholder="输入新密码"
            v-model="userInfo.newPW"
            show-password
          >
            <template slot="prepend">新 密 码</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="newPW1">
          <el-input
            class="username"
            type="password"
            placeholder="再次输入新密码"
            v-model="userInfo.newPW1"
            show-password
          >
            <template slot="prepend">重复密码</template>
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="changePW">修改密码</el-button>
      </el-form>
    </el-main>
  </el-scrollbar>
</template>

<script>
import { reqUserInfo, reqChangePW } from "../../api/index";
export default {
  data: function() {
    var checkPW = (rule, value, callback) => {
      if (value !== this.userInfo.newPW) {
        return callback(new Error("两次输入的密码不一致"));
      }
      return callback();
    };
    return {
      userInfo: {
        originalPW: "",
        newPW: "",
        newPW1: ""
      },
      rules: {
        originalPW: [
          { required: true, message: "请输原密码", trigger: "blur" }
        ],
        newPW: [{ required: true, message: "请输新密码", trigger: "blur" }],
        newPW1: [
          { required: true, message: "请输新密码", trigger: "blur" },
          { trigger: "blur", validator: checkPW }
        ]
      }
    };
  },
  methods: {
    async changePW() {
      const { userInfo } = this;
      this.$refs.userInfo.validate(async valid => {
        if (!valid) {
          this.$message.error("信息输入有误")
          return;
        }
        const isRealPW = await reqUserInfo(this.$store.state.userInfo.userId);
        if (userInfo.originalPW === isRealPW.data.password) {
          const result = await reqChangePW(
            this.$store.state.userInfo.userId,
            userInfo.newPW
          );
          if (result.code == 1) {
            this.$message.success(result.msg)
          } else {
            this.$message.error(result.msg)
            return;
          }
        } else {
          this.$message.error("原密码输入错误")
          return;
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-scrollbar {
  width: 100%;
}

.el-form {
  width: 80%;
  margin: auto;
}

.username {
  width: 350px;
}

.el-avatar {
  border: solid 1px lightgray;
}
</style>