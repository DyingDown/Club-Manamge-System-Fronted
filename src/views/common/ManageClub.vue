<template>
  <el-scrollbar>
    <el-main>
      <div content="社团人员">社团人员</div>
      <el-divider></el-divider>
      <el-tabs type="border-card">
        <el-tab-pane label="社团成员">
          <el-table
            :data="filterClubMembers1.slice((currentPage - 1)*pageSize, currentPage*pageSize)"
            :default-sort="{prop: 'date', order: 'descending'}"
            style="width: 100%"
          >
            <el-table-column label="用户名" prop="nickname" sortable></el-table-column>
            <el-table-column label="电话" prop="tel"></el-table-column>
            <el-table-column prop="applyTime" label="加入时间"></el-table-column>
            <el-table-column align="right">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search1" size="mini" placeholder="Type to search" />
              </template>
              <template slot-scope="scope">
                <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button> -->
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br />
          <el-pagination
            background
            layout="prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="filterClubMembers1.length"
            :page-size="pageSize"
            :current-page="currentPage"
            :pager-count="5"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="社团管理员">
          <el-table
            :data="clubAdmins.filter(data => !search || data.nickname.toLowerCase().includes(search.toLowerCase()))"
            :default-sort="{prop: 'date', order: 'descending'}"
            style="width: 100%"
          >
            <el-table-column label="用户名" prop="nickname" sortable></el-table-column>
            <el-table-column label="电话" prop="tel"></el-table-column>
            <el-table-column prop="applyTime" label="加入时间"></el-table-column>
            <el-table-column align="right">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="Type to search" />
              </template>
              <template slot-scope="scope">
                <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button> -->
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleEdit(scope.$index, scope.row)"
                >修改权限</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="添加管理员">
          <el-form :rules="rules" ref="adminInfo" :model="adminInfo">
            <el-form-item prop="studentId">
              <el-input class="username" v-model="adminInfo.studentId">
                <template slot="prepend">学号</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addAdmin">添加</el-button>
            </el-form-item>
          </el-form>
          <el-dialog title="添加管理员" :visible.sync="isShownContent" width="55%" center>
            <el-card shadow="hover">
              <el-avatar class="card-avatar" :size="125" :src="userInfo.avatarId" shape="square"></el-avatar>
              <div class="card-info">
                <span class="card-name">学号：</span>
                {{adminInfo.studentId}}
                <br />
                <span class="card-name">用户名：</span>
                {{userInfo.nickname}}
                <br />
                <span class="card-name">真实姓名：</span>
                {{userInfo.realname}}
                <br />
                <span class="card-name">性别：</span>
                {{userInfo.sex}}
                <br />
                <span class="card-name">入学日期：</span>
                {{userInfo.enrollmentDate}}-{{userInfo.graduationDate}}
                <br />
                <span class="card-name">联系电话</span>
                {{userInfo.tel}}
              </div>
            </el-card>
            <span slot="footer" class="dialog-footer">
              <el-button @click="isShownContent = false;$message.info('取消操作')">Cancel</el-button>
              <el-button type="primary" @click="confirmAdd">Confirm</el-button>
            </span>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="申请加入人员">
          <el-table
            :data="filterClubMembers.slice((currentPage1 - 1)*pageSize1, currentPage1*pageSize1)"
            style="width: 100%"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <p>真实姓名: {{ props.row.realname }}</p>
                <p>性别: {{ props.row.sex }}</p>
                <p>年级: {{ props.row.grade }}</p>
                <p>专业: {{ props.row.profession }}</p>
                <p>联系电话: {{ props.row.tel }}</p>
                <p>QQ: {{ props.row.qq }}</p>
                <p>自我描述: {{ props.row.description }}</p>
              </template>
            </el-table-column>
            <el-table-column label="申请时间" prop="applyTime" sortable></el-table-column>
            <el-table-column label="申请人" prop="nickname"></el-table-column>
            <el-table-column label="操作" prop="agree">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search2" size="mini" placeholder="Type to search" />
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="success"
                  @click="handleAgree(scope.$index, scope.row)"
                >同意</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br />
          <el-pagination
            background
            layout="prev, pager, next"
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :total="filterClubMembers.length"
            :page-size="pageSize1"
            :current-page="currentPage1"
            :pager-count="5"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-scrollbar>
</template>

<script>
let moment = require("moment");
import {
  reqClubApplys,
  reqClubMembers,
  reqUserInfo,
  reqDeleteMember,
  reqChangeRole,
  reqStudentId
} from "../../api/index";
export default {
  data: function() {
    return {
      search: "",
      search1: "",
      search2: "",
      currentPage: 1,
      pageSize: 8,
      currentPage1: 1,
      pageSize1: 8,
      clubMembers: [],
      clubAdmins: [],
      applys: [],
      adminInfo: {
        studentId: ""
      },
      rules: {
        studentId: [{ required: true, trigger: "blur" }]
      },
      userInfo: {},
      isShownContent: false,
      clubId: "",
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.$confirm("是将该成员剔除管理员？", "警告", {
        confirmButtonText: "修改",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async action => {
          const result = await reqChangeRole(row.clubId, row.userId, 2);
          console.log(result);
          if (result.code === 1) {
            this.$message.success("已修改");
          location.reload();
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch(() => {
          this.$message.info("取消操作");
        });
    },
    handleDelete(index, row) {
      this.$confirm("是否确定删除该成员？", "警告", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async action => {
          const result = await reqDeleteMember(row.clubId, row.userId);
          if (result.code === 1) {
            this.$message.success("已删除");
          location.reload();
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch(() => {
          this.$message.info("取消操作");
        });
    },
    handleAgree(index, row) {
      this.$confirm("是否同意该成员加入？", "警告", {
        confirmButtonText: "同意",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async action => {
          const result = await reqChangeRole(this.clubId, row.userId, 2);
          if (result.code === 1) {
            this.$message.success("该成员已加入社团");
            location.reload();
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch(() => {
          this.$message.info("取消操作");
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange1(val) {
      this.pageSize1 = val;
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val;
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    async confirmAdd() {
      const result = await reqChangeRole(this.clubId, this.userInfo.userId, 1);
      if(result.code == 1) this.$message.success("添加成功");
      else this.$message.error(result.msg)
      this.isShownContent = false
    },
    async addAdmin() {
      // this.adminInfo.studentId =
      this.$refs.adminInfo.validate(async valid => {
        if (!valid) return;
        const result = await reqStudentId(this.adminInfo.studentId, 1, 1);
        if (result.code != 1) {
          this.$message.error("出现错误");
          return;
        }
        if (result.data.totalPages != 1) {
          this.$message.error("请输入准确的学号");
          return;
        }
        var flag = 0;
        for (var i in this.clubMembers) {
          if (this.clubMembers[i].userId == result.data.content[0].userId) {
            // console.log(this.clubMembers[i].userId.role)
            if(this.clubMembers[i].role == 0) {
              this.$message.error('您无权修改该用户权限')
              return ;
            } else if(this.clubMembers[i].role == 1){
              this.$message.error('该用户已经是管理员')
              return ;
            }
            flag = 1;
          }
        }
        if (flag == 1) {
          this.userInfo = result.data.content[0];
          this.userInfo.avatarId =
            "http://localhost:8080/api/image/" + this.userInfo.avatarId;
          this.userInfo.enrollmentDate = moment(
            this.userInfo.enrollmentDate
          ).format("YYYY年MM月DD");
          this.userInfo.graduationDate = moment(
            this.userInfo.graduationDate
          ).format("YYYY年MM月DD");
          this.isShownContent = true;
        } else {
          this.$message.error("该用户不是社团成员！");
        }
      });
    },
    async getMessages() {
      this.clubId = window.location.href.split("=")[1];
      let apply = await reqClubApplys(this.clubId);
      let result = await reqClubMembers(this.clubId);
      // console.log(result.data);
      for (var i = 0; i < result.data.length; i++) {
        result.data[i].applyTime = moment(result.data[i].releaseTime).format(
          "YYYY-MM-DD HH:mm"
        );
        let temp = await reqUserInfo(result.data[i].userId);
        result.data[i].nickname = temp.data.nickname;
        result.data[i].tel = temp.data.tel;
        if (result.data[i].role == 0 || result.data[i].role == 1)
          this.clubAdmins.push(result.data[i]);
      }
      this.clubMembers = result.data;
      // console.log(this.clubMembers);
      for(var i = 0; i < apply.data.length; i ++) {
        const temp = await reqUserInfo(apply.data[i].userId)
        apply.data[i] = Object.assign(apply.data[i],temp.data)
        apply.data[i].applyTime = moment(apply.data[i].applyTime).format("YYYY-MM-DD HH:mm");
      }
      console.log(apply.data)
      this.applys = apply.data;
    }
  },
  async mounted() {
    await this.getMessages();
  },
  computed: {
    filterClubMembers1() {
      const { search1, clubMembers } = this;
      let fClubMembers;
      fClubMembers = clubMembers.filter(
        data =>
          !search1 ||
          data.nickname.toLowerCase().includes(search1.toLowerCase())
      );
      return fClubMembers;
    },
    filterClubMembers() {
      const { search2, applys } = this;
      let fClubMembers;
      fClubMembers = applys.filter(
        data =>
          !search2 ||
          data.nickname.toLowerCase().includes(search2.toLowerCase())
      );
      return fClubMembers;
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-scrollbar {
  width: 100%;
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

.card-name {
  font-weight: bold;
  color: #FFD04B;
}

.el-button {
  text-align: right;
}
</style>