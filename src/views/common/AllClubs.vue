<template>
  <el-scrollbar>
    <el-main>
      <!-- <div content="所有社团">所有社团</div> -->
      <el-row>
        <el-col :span="12"></el-col>
        <el-col :span="12">
          <el-input placeholder="搜索社团" v-model="input" class="input-with-search">
            <el-button slot="append" icon="el-icon-search" @click="changeContent"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- <el-divider></el-divider> -->
      <el-row :gutter="30">
        <el-col :span="12" v-for="(o) in clubs" :key="o.clubId">
          <el-card shadow="hover">
            <el-avatar class="card-avatar" :size="125" :src="o.avatarId" shape="square"></el-avatar>
            <div class="card-info">
              <span class="card-name">社团名称：</span>
              {{o.name}}
              <br />
              <span class="card-name">社团类型：</span>
              {{o.type}}
            </div>
            <br />
            <br />
            <div>
              <span class="card-name">社团简介：</span>
              {{o.introduction}}
            </div>
            <br />
            <el-button type="primary" @click="joinClub(o.clubId)">加入我们</el-button>
          </el-card>
        </el-col>
      </el-row>
      <el-dialog title="加入社团申请表" :visible.sync="dialogFormVisible">
        <el-form :model="applyInfo" :label-width="formLabelWidth" :rules="rules" ref="applyInfo">
          <el-form-item label="姓名" prop="realname">
            <el-input v-model="applyInfo.realname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="applyInfo.sex">
              <el-radio label="女"></el-radio>
              <el-radio label="男"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="专业" prop="profession">
            <el-select placeholder="请选择你的专业" v-model="applyInfo.profession">
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
          <el-form-item label="年级" :label-width="formLabelWidth" prop="grade">
            <el-select v-model="applyInfo.grade" placeholder="请选择一个年级">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话" prop="tel">
            <el-input v-model="applyInfo.tel" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="QQ" prop="qq">
            <el-input v-model="applyInfo.qq" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="个人简介" prop="introduction">
            <el-input type="textarea" v-model="applyInfo.introduction"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false; $message.info('取消操作')">Cancel</el-button>
          <el-button type="primary" @click="saveApply">Confirm</el-button>
        </span>
      </el-dialog>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalPages"
        :page-size="1"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-main>
  </el-scrollbar>
</template>

<script>
import {
  reqAllClubs,
  reqMSUserInfo,
  reqClubApplys,
  reqSearchClub
} from "../../api/index";
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (value === null) return callback(new Error("请输入电话"));
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
      if (!phoneReg.test(value) && value != "") {
        callback(new Error("电话号码格式不正确"));
      }
      callback();
    };
    var checkQQ = (rule, value, callback) => {
      if (value == null) return callback(new Error("请输入QQ号码"));
      const qqReg = /[1-9][0-9]{4,}/;
      if (qqReg.test(value) || value == "") {
        callback();
      } else {
        callback(new Error("QQ号码格式不正确"));
      }
    };
    var checkPeopleName = (rule, value, callback) => {
      console.log(value);
      var reg = /^[\u4E00-\u9FA5]+$/;
      if (value === "" || value === undefined)
        callback(new Error("请输入申请人姓名"));
      if (!reg.test(value)) callback(new Error("非法姓名"));
      callback();
    };
    var checkNull = (rule, value, callback) => {
      console.log(value);
      if (value === "") callback(new Error("请输入信息"));
      callback();
    };
    var checkTxt = (rule, value, callback) => {
      if (value === undefined) callback(new Error("请填写个人介绍"));
      else if (value.length < 10) callback(new Error("内容少于10字"));
      else if (value.length > 400) callback(new Error("内容多余400字"));
      callback();
    };
    return {
      input: "",
      clubs: [],
      dialogFormVisible: false,
      applyInfo: {
        grade: "",
        realname: this.$store.state.userInfo.realname,
        sex: this.$store.state.userInfo.sex || "女",
        tel: this.$store.state.userInfo.tel,
        qq: this.$store.state.userInfo.qq,
        profession: this.$store.state.userInfo.profession,
        introduction: ""
      },
      formLabelWidth: "70px",
      totalPages: 1,
      currentPage: 1,
      pageSize: 4,
      rules: {
        tel: [{ validator: checkPhone, trigger: "blur" }],
        qq: [{ validator: checkQQ, trigger: "blur" }],
        realname: [{ validator: checkPeopleName, trigger: "blur" }],
        profession: [{ validator: checkNull, trigger: "blur" }],
        grade: [{ validator: checkNull, trigger: "blur" }],
        introduction: [{ validator: checkTxt, trigger: "blur" }]
      },
      clubId: ""
    };
  },
  methods: {
    joinClub(id) {
      this.dialogFormVisible = true;
      this.clubId = id;
      // this.$router.replace({ path: `/joinclub?clubId=${id}` });
    },
    saveApply() {
      this.$confirm(
        "提交后，无法修改,并且个人信息将会自动更新，是否确认提交？",
        "警告",
        {
          confirmButtonText: "提交",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async action => {
          const { applyInfo } = this;
          this.$refs.applyInfo.validate(async valid => {
            console.log("sss");
            if (!valid) {
              this.$message.error("信息输入有误");
              return;
            }
            const contact = await reqMSUserInfo(
              this.$store.state.userInfo.userId,
              applyInfo.realname,
              applyInfo.sex,
              applyInfo.profession,
              applyInfo.tel,
              applyInfo.qq
            );
            console.log(contact.data);
            if (contact.code == 1) {
              this.$message.success("个人信息保存成功");
              const result = await reqClubApplys(
                this.clubId,
                applyInfo.grade,
                applyInfo.introduction
              );
              if (result.code === 1) {
                this.$message.success("提交成功");
                this.dialogFormVisible = false;
              } else {
                this.$message.error(result.msg);
              }
            } else {
              this.$message.error("个人信息保存失败");
            }
          });
        })
        .catch(() => {
          this.$message.info("取消提交");
        });
    },
    async handleCurrentChange(val) {
      this.currentPage = val;
      // console.log(val);
      // this.$router.push({ path: "/allclubs" + `?page=${val}` });
      // location.reload();
      this.changeContent
      this.currentPage = val;
    },
    async getMessages() {
      // const { myCreates } = this;
      this.currentPage = 1;
      // console.log(this.currentPage);
      const typeList = { 1: "学术类", 2: "实践类", 3: "文艺类", 4: "体育类" };
      const result = await reqAllClubs(4, 1, 3);
      this.totalPages = parseInt(result.data.totalPages);
      // console.log(this.totalPages);
      for (var i = 0; i < result.data.content.length; i++) {
        result.data.content[i].type = typeList[result.data.content[i].type];
        result.data.content[i].avatarId =
          "http://localhost:8080/api/image/" + result.data.content[i].avatarId;
      }
      this.clubs = result.data.content;
      // console.log(this.clubs);
      for (var e in this.clubs) {
        
      }
      // console.log(this.clubs);
    },
    async searchClubs() {
      const result = await reqSearchClub(this.input, 1, 4)
    },
  },
  async mounted() {
    await this.getMessages();
  },
  computed: {
    async changeContent() {
      let result;
      // console.log(this.currentPage)
      if(this.input == "") {
        result = await reqAllClubs(4, this.currentPage, 3);
        this.totalPages = result.data.totalPages
      } else {
        result = await reqSearchClub(this.input, this.currentPage, 4)
        // console.log(result.data)
        this.totalPages = result.data.totalPages 
      }
      const typeList = { 1: "学术类", 2: "实践类", 3: "文艺类", 4: "体育类" };
      for (var i = 0; i < result.data.content.length; i++) {
        result.data.content[i].type = typeList[result.data.content[i].type];
        result.data.content[i].avatarId =
          "http://localhost:8080/api/image/" + result.data.content[i].avatarId;
      }
      this.clubs = result.data.content;
      console.log(this.clubs)
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

.time {
  font-size: 13px;
  color: #999;
}

// .bottom {
// margin-top: 13px;
// line-height: 12px;
// }
.button {
  // padding: 10px;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before, .clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}

.el-col {
  margin-top: 15px;
  margin-bottom: 15px;
  overflow: hidden;
}

.el-card {
  line-height: 30px;
  height: 100%;
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

.el-button {
  text-align: right;
}
</style> 