<template>
  <el-scrollbar>
    <el-main>
      <div content="创建社团">创建社团</div>
      <el-divider></el-divider>
      <div class="main-content">
        <el-steps :active="progress" finish-status="success">
          <el-step title="填写申请表"></el-step>
          <el-step title="社联审核"></el-step>
          <el-step title="完善社团信息"></el-step>
        </el-steps>
        <br />
        <el-form
          :rules="rules"
          ref="newClubInfo"
          :model="newClubInfo"
          label-width="100px"
          v-if="progress == 0"
        >
          <h3>基本信息</h3>
          <el-form-item label="社团名称" prop="basicInfo.clubName">
            <el-input
              class="username"
              placeholder="只能由中文组成"
              v-model="newClubInfo.basicInfo.clubName"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属类别" prop="basicInfo.category">
            <el-radio-group v-model="newClubInfo.basicInfo.category">
              <el-radio :label="1">学术类</el-radio>
              <el-radio :label="2">实践类</el-radio>
              <el-radio :label="3">文艺类</el-radio>
              <el-radio :label="4">体育类</el-radio>
            </el-radio-group>
          </el-form-item>
          <h3>主要发起人</h3>
          <el-form-item label="真实姓名" prop="userInfo.name">
            <el-input class="username" v-model="newClubInfo.userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="userInfo.major">
            <el-select placeholder="请选择你的专业" v-model="newClubInfo.userInfo.major">
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
          <el-form-item label="邮箱" prop="userInfo.email">
            <el-input class="username" v-model="newClubInfo.userInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="userInfo.tel">
            <el-input class="username" v-model="newClubInfo.userInfo.tel"></el-input>
          </el-form-item>
          <h3>指导教师</h3>
          <el-form-item label="真实姓名" prop="supervisorInfo.name">
            <el-input class="username" v-model="newClubInfo.supervisorInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="supervisorInfo.tel">
            <el-input class="username" v-model="newClubInfo.supervisorInfo.tel"></el-input>
          </el-form-item>
          <h3>社团描述</h3>
          <el-form-item label="社团宗旨" prop="descriptionInfo.coreValue">
            <el-input
              type="textarea"
              v-model="newClubInfo.descriptionInfo.coreValue"
              placeholder="100字以上500字以下"
            ></el-input>
          </el-form-item>
          <el-form-item label="主要活动计划" prop="descriptionInfo.plans">
            <el-input
              type="textarea"
              v-model="newClubInfo.descriptionInfo.plans"
              placeholder="100字以上500字以下"
            ></el-input>
          </el-form-item>
          <el-form-item label="可行性分析" prop="descriptionInfo.practicalityAnalysis">
            <el-input
              type="textarea"
              v-model="newClubInfo.descriptionInfo.practicalityAnalysis"
              placeholder="100字以上500字以下"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          style="margin-top: 12px;"
          type="primary"
          @click="saveApply"
          v-if="progress == 0"
        >下一步</el-button>
        <h3 v-if="progress == 1">提交成功，等待管理员审核</h3>
        <el-form
          :rules="rules"
          ref="newClubInfo"
          :model="newClubInfo"
          label-width="50px"
          v-if="progress == 2"
        >
          <h3>头像</h3>
          <el-form-item>
            <el-avatar :size="125" :src="imgDataUrl" shape="square"><img :src="imgDataUrl" alt=""/></el-avatar>
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
          <h3>社团简介</h3>
          <el-form-item prop="descriptionInfo.introduction">
            <el-input
              type="textarea"
              v-model="newClubInfo.descriptionInfo.introduction"
              placeholder="100字以上500字以下"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changeInfo">保存</el-button>
          </el-form-item>
        </el-form>
        <el-col v-if="progress == 3">
          <el-card shadow="hover">
            <el-avatar class="card-avatar" :size="125" :src="imgDataUrl" shape="square"></el-avatar>
            
            <div class="card-info">
              <span class="card-name">社团名称：</span>
              {{this.$store.state.currentEditClub.name}}
              <br />
              <span class="card-name">社团类型：</span>
              {{this.$store.state.currentEditClub.type}}
            </div>
            <br />
            <br />
            <div>
              <span class="card-name">社团简介：</span>
              {{this.$store.state.currentEditClub.introduction}}
            </div>
          </el-card>
        </el-col>
      </div>
    </el-main>
  </el-scrollbar>
</template>

<script>
import myUpload from "vue-image-crop-upload";
import {
  reqClubApplication,
  reqMContactInfo,
  reqMClubApplication
} from "../../api/index.js";
export default {
  components: {
    "my-upload": myUpload
  },
  data() {
    var checkName = (rule, value, callback) => {
      var reg = /^[\u4E00-\u9FA5]+$/;
      if (value === "") callback(new Error("请输入社团名称"));
      if (!reg.test(value)) callback(new Error("社团名称不合法"));
      callback();
    };
    var checkPeopleName = (rule, value, callback) => {
      var reg = /^[\u4E00-\u9FA5]+$/;
      if (value === "") callback(new Error("请输申请人姓名"));
      if (!reg.test(value)) callback(new Error("非法姓名"));
      callback();
    };
    var checkMail = (rule, value, callback) => {
      var reg = /^[A-Za-z0-9_-\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (value === "") callback(new Error("请输入邮箱"));
      if (!reg.test(value) && value !== "")
        callback(new Error("请输入有效的邮箱"));
      callback();
    };
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
      if (value === "") callback(new Error("请输入电话号码"));
      if (!phoneReg.test(value) && value != "")
        callback(new Error("电话号码格式不正确"));
      callback();
    };
    var checkTxt = (rule, value, callback) => {
      if(value === undefined) callback(new Error("请填写"))
      else if (value.length < 10) callback(new Error("内容少于10字"));
      else if (value.length > 500) callback(new Error("内容多余500字"));
      callback();
    };
    return {
      show: false,
      imgDataUrl:
        "http://localhost:8080/api/image/" +
        this.$store.state.currentEditClub.avatarId,
      progress: this.$store.state.currentEditClub.progress,
      newClubInfo: {
        basicInfo: {
          clubName: "",
          category: ""
        },
        userInfo: {
          major: this.$store.state.userInfo.profession,
          name: this.$store.state.userInfo.realname,
          email: this.$store.state.userInfo.email,
          tel: this.$store.state.userInfo.tel,
          id: this.$store.state.userInfo.userId
        },
        supervisorInfo: {
          name: "",
          tel: ""
        },
        descriptionInfo: {
          coreValue: "",
          plans: "",
          practicalityAnalysis: "",
          discription: "",
          avatarId: ""
        }
      },
      rules: {
        basicInfo: {
          clubName: [{ validator: checkName, trigger: "blur" }],
          category: [{ required: true, message: "请选择类别", trigger: "blur" }]
        },
        userInfo: {
          name: [
            { validator: checkPeopleName, trigger: "blur" },
            { min: 2, max: 4, trigger: "blur", message: "姓名不合法" }
          ],
          email: [{ validator: checkMail, trigger: "blur" }],
          tel: [{ validator: checkPhone, trigger: "blur" }],
          major: [{ required: true, message: "请选择专业", trigger: "blur" }]
        },
        supervisorInfo: {
          name: [{ validator: checkPeopleName, trigger: "blur" }],
          tel: [{ validator: checkPhone, trigger: "blur" }]
        },
        descriptionInfo: {
          coreValue: [{ validator: checkTxt, trigger: "blur" }],
          plans: [{ validator: checkTxt, trigger: "blur" }],
          practicalityAnalysis: [{ validator: checkTxt, trigger: "blur" }],
          introduction: [{ validator: checkTxt, trigger: "blur" }]
        }
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
      // console.log(this.imgDataUrl);
    },
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData.data);
      this.$store.state.currentEditClub.avatarId = jsonData.data;
      this.newClubInfo.descriptionInfo.avatarId = jsonData.data 
      console.log("field: " + field);
    },
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    },
    saveApply() {
      this.$confirm(
        "提交后，个人信息将会自动更新，并且无法修改，是否确认提交？",
        "警告",
        {
          confirmButtonText: "提交",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(action => {
          const { newClubInfo, progress } = this;
          this.$refs.newClubInfo.validate(async valid => {
            if (!valid) {
              this.$message.error("信息输入有误");
              return;
            }
            const contact = reqMContactInfo(
              this.$store.state.userInfo.userId,
              newClubInfo.userInfo.name,
              newClubInfo.userInfo.email,
              newClubInfo.userInfo.tel,
              newClubInfo.userInfo.major
            );
            const result = await reqClubApplication(
              newClubInfo.basicInfo.clubName,
              newClubInfo.basicInfo.category,
              newClubInfo.userInfo.id,
              newClubInfo.supervisorInfo.name,
              newClubInfo.supervisorInfo.tel,
              newClubInfo.descriptionInfo.coreValue,
              newClubInfo.descriptionInfo.plans,
              newClubInfo.descriptionInfo.practicalityAnalysis,
              1
            );
            if (result.code === 1) {
              this.$message.success("提交成功");
              this.progress++;
            } else {
              this.$message.error(result.msg);
            }
          });
        })
        .catch(() => {
          this.$message.info("取消提交");
        });
    },
    async changeInfo() {
      this.$refs.newClubInfo.validate(async valid => {
        console.log(this.newClubInfo.descriptionInfo.avatarId)
        if (valid && this.newClubInfo.descriptionInfo.avatarId != "") {
          const result = await reqMClubApplication(
            this.$store.state.currentEditClub.clubId,
            this.newClubInfo.descriptionInfo.avatarId,
            this.newClubInfo.descriptionInfo.introduction,
            ++this.progress
          );
          if (result.code === 1) {
            this.$message.success("社团创建成功");
            this.$store.state.currentEditClub.introduction = this.newClubInfo.descriptionInfo.introduction
          } else {
            this.$message.error(result.msg);
          }
        } else { 
          this.$message.error("信息不完善");
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

.main-content {
  width: 80%;
  margin: auto;
}

.username {
  width: 250px;
}

.el-card {
  width: 75%;
  margin: 50px;
  line-height: 30px;
}

.card-avatar {
  float: right;
  margin: 0 0 20px 20px;
  border: solid #f0f2f7 1px;
}

.card-info {
  float: left;
}

.card-name {
  font-weight: bold;
  color: #FFD04B;
}
</style> 