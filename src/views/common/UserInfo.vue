<template>
  <el-scrollbar>
    <el-main>
      <div content="个人信息">个人信息</div>
      <el-divider></el-divider>
      <el-form :rules="rules" ref="userInfo" :model="userInfo" label-width="80px">
        <h3>基本信息</h3>
        <el-form-item>
          <el-avatar :size="125" :src="imgDataUrl"></el-avatar>
          <br />
          <el-button type="primary" @click="toggleShow">上传头像</el-button>
          <my-upload
            field="img"
            @crop-success="cropSuccess"
            @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail"
            v-model="show"
            :width="300"
            :height="300"
            url="/api/image"
            img-format="png"
          ></my-upload>
        </el-form-item>

        <el-form-item label="昵称">
          <el-input class="username" v-model="userInfo.nickname"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input class="username" v-model="userInfo.realname"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="userInfo.sex">
            <el-radio label="女"></el-radio>
            <el-radio label="男"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="专业">
          <el-select placeholder="请选择你的专业" v-model="userInfo.profession">
            <el-option label="安全科学与工程" :value="1"></el-option>
            <el-option label="财经" :value="2"></el-option>
            <el-option label="测绘" :value="3"></el-option>
            <el-option label="电气工程及其自动化" :value="4"></el-option>
            <el-option label="工商管理" :value="5"></el-option>
            <el-option label="体育" :value="6"></el-option>
            <el-option label="建筑与艺术设计" :value="7"></el-option>
            <el-option label="计算机科学与技术" :value="8"></el-option>
            <el-option label="数学与信息科学" :value="9"></el-option>
            <el-option label="能源科学与工程" :value="10"></el-option>
            <el-option label="物理与电子信息" :value="11"></el-option>
            <el-option label="土木工程" :value="12"></el-option>
            <el-option label="外国语" :value="13"></el-option>
            <el-option label="材料科学与工程" :value="14"></el-option>
            <el-option label="机械与动力工程" :value="15"></el-option>
            <el-option label="应急管理" :value="16"></el-option>
            <el-option label="医学" :value="17"></el-option>
            <el-option label="音乐" :value="18"></el-option>
            <el-option label="资源环境" :value="19"></el-option>
            <el-option label="化学化工" :value="20"></el-option>
            <el-option label="文法" :value="21"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入学日期">
          <el-col :span="8">
            <el-date-picker
              v-model="userInfo.enrollmentDate"
              type="date"
              placeholder="选择一个日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="毕业日期">
          <el-col :span="8">
            <el-date-picker
              v-model="userInfo.graduationDate"
              type="date"
              placeholder="选择一个日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        {{userInfo.graduateDate}}
        <el-form-item label="个人简介">
          <el-input type="textarea" v-model="userInfo.introduction"></el-input>
        </el-form-item>
        <h3>联系方式</h3>
        <el-form-item label="邮箱" prop="email">
          <el-input class="username" v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input class="username" v-model="userInfo.tel"></el-input>
        </el-form-item>
        <el-form-item label="QQ" prop="qq">
          <el-input class="username" v-model="userInfo.qq"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveUserInfo">保存</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-scrollbar>
</template>

<script>
import myUpload from "vue-image-crop-upload";
import { reqMUserInfo } from "../../api/index";
export default {
  components: {
    "my-upload": myUpload
  },
  data: function() {
    var checkPhone = (rule, value, callback) => {
      if(value === null) return callback();
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
      if (!phoneReg.test(value) && value != "") {
        callback(new Error("电话号码格式不正确"));
      }
      callback();
    };
    var checkQQ = (rule, value, callback) => {
      if(value == null)  return callback();
      const qqReg = /[1-9][0-9]{4,}/;
      if (qqReg.test(value) || value == "") {
        callback();
      } else {
        callback(new Error("QQ号码格式不正确"));
      }
    };
    var checkPeopleName = (rule, value, callback) => {
      var reg = /^[\u4E00-\u9FA5]+$/;
      // if (value === "") callback(new Error("请输申请人姓名"));
      if (!reg.test(value)) callback(new Error("非法姓名"));
      callback();
    };
    var checkMail = (rule, value, callback) => {
      if(value == null) return callback();
      var reg = /^[A-Za-z0-9_-\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(value) && value !== "") {
        callback(new Error("请输入有效的邮箱"));
      }
      callback();
    };
    var checkPW = (rule, value, callback) => {
      if (value !== this.userInfo.newPw1) {
        return callback(new Error("两次输入的密码不一致"));
      }
    };
    return {
      show: false,
      imgDataUrl: 'http://localhost:8080/api/image/'+this.$store.state.userInfo.avatarId,
      userInfo: {
        nickname: this.$store.state.userInfo.nickname,
        realname: this.$store.state.userInfo.realname,
        sex: this.$store.state.userInfo.sex,
        enrollmentDate: this.$store.state.userInfo.enrollmentDate,
        graduationDate: this.$store.state.userInfo.graduationDate,
        profession: this.$store.state.userInfo.profession,
        introduction: this.$store.state.userInfo.introduction,
        tel: this.$store.state.userInfo.tel,
        qq: this.$store.state.userInfo.qq,
        email: this.$store.state.userInfo.email,
        userId: this.$store.state.userInfo.userId,
        avatarId: ""
      },
      rules: {
        email: [{ validator: checkMail, trigger: "blur", required: false}],
        tel: [{ validator: checkPhone, trigger: "blur", required: false }],
        qq: [{ validator: checkQQ, trigger: "blur", required: false }],
        realname: [{ validator: checkPeopleName, trigger: "blur", required: false}]
      }
    };
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
    },
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      this.userInfo.avatarId = jsonData.data
      console.log("field: " + field);
    },
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    },
    async saveUserInfo() {
      const { userInfo } = this;
      this.$refs.userInfo.validate(async valid => {
        if (!valid) {
          this.$message.error("信息输入有误")
          return;
        } 
        const result = await reqMUserInfo(
          userInfo.userId,
          userInfo.nickname,
          userInfo.realname,
          userInfo.sex,
          userInfo.enrollmentDate,
          userInfo.graduateDate,
          userInfo.avatarId,
          userInfo.profession,
          userInfo.email,
          userInfo.tel,
          userInfo.qq,
          userInfo.introduction
        );
        if (result.code === 1) {
          this.$message.success(result.msg);
        } else {
          this.$message.error("保存失败");
        }
        this.$router.go(0);
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
  width: 250px;
}

.el-avatar {
  border: solid 1px lightgray;
}
</style>