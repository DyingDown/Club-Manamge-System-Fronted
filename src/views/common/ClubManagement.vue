<template>
  <el-scrollbar>
    <el-main>
      <div content="所有社团">所有社团</div>
      <el-divider></el-divider>
      <el-tabs type="border-card">
        <el-tab-pane label="未批准的社团">
          <el-table
            :data="filterClubs.slice((currentPage - 1)*pageSize, currentPage*pageSize)"
            style="width: 100%"
            @filter-change="fliterChange"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <p>
                  <span class="name">真实姓名:</span>
                  {{ props.row.realName }}
                </p>
                <p>
                  <span class="name">申请人学号:</span>
                  {{ props.row.number }}
                </p>
                <p>
                  <span class="name">申请人专业:</span>
                  {{ props.row.profession }}
                </p>
                <p>
                  <span class="name">联系电话:</span>
                  {{ props.row.tel }}
                </p>
                <p>
                  <span class="name">指导老师姓名:</span>
                  {{ props.row.consultantName }}
                </p>
                <p>
                  <span class="name">指导老师电话:</span>
                  {{ props.row.consultantTel }}
                </p>
                <p>
                  <span class="name">社团宗旨:</span>
                  {{ props.row.coreValues }}
                </p>
                <p>
                  <span class="name">主要活动计划:</span>
                  {{ props.row.plans }}
                </p>
                <p>
                  <span class="name">可行性分析:</span>
                  {{ props.row.practicallyAnalysis }}
                </p>
              </template>
            </el-table-column>
            <el-table-column label="申请时间" prop="applyTime" sortable></el-table-column>
            <el-table-column label="社团名字" prop="name"></el-table-column>
            <el-table-column label="申请人" prop="nickName"></el-table-column>
            <el-table-column
              prop="type"
              label="社团类型"
              :filters="[{ text: '学术类', value: '学术类' }, { text: '实践类', value: '实践类' }, { text: '文艺类', value: '文艺类' }, { text: '体育类', value: '体育类' }]"
              :filter-method="filterTag"
              column-key="hosttype"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.type === '学术类' ? 'success': (scope.row.type === '实践类' ? 'danger': (scope.row.type === '文艺类' ?  'info' : 'primary'))"
                >{{scope.row.type}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="right">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="搜索社团名称" />
              </template>
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                >批准同意</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br />
          <el-pagination
            background
            layout="prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="filterClubs.length"
            :page-size="pageSize"
            :current-page="currentPage"
            :pager-count="5"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="所有社团">
          <el-table
            :data="filterClubs1.slice((currentPage1 - 1)*pageSize, currentPage1*pageSize)"
            style="width: 100%"
            @filter-change="fliterChange1"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <p>
                  <span class="name">真实姓名:</span>
                  {{ props.row.realName }}
                </p>
                <p>
                  <span class="name">申请人学号:</span>
                  {{ props.row.number }}
                </p>
                <p>
                  <span class="name">申请人专业:</span>
                  {{ props.row.profession }}
                </p>
                <p>
                  <span class="name">联系电话:</span>
                  {{ props.row.tel }}
                </p>
                <p>
                  <span class="name">指导老师姓名:</span>
                  {{ props.row.consultantName }}
                </p>
                <p>
                  <span class="name">指导老师电话:</span>
                  {{ props.row.consultantTel }}
                </p>
                <p>
                  <span class="name">社团宗旨:</span>
                  {{ props.row.coreValues }}
                </p>
                <p>
                  <span class="name">主要活动计划:</span>
                  {{ props.row.plans }}
                </p>
                <p>
                  <span class="name">可行性分析:</span>
                  {{ props.row.practicallyAnalysis }}
                </p>
              </template>
            </el-table-column>
            <el-table-column label="申请时间" prop="applyTime" sortable></el-table-column>
            <el-table-column label="社团名字" prop="name"></el-table-column>
            <el-table-column label="申请人" prop="nickName"></el-table-column>
            <el-table-column
              prop="type"
              label="社团类型"
              :filters="[{ text: '学术类', value: '学术类' }, { text: '实践类', value: '实践类' }, { text: '文艺类', value: '文艺类' }, { text: '体育类', value: '体育类' }]"
              :filter-method="filterTag"
              column-key="hosttype"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.type === '学术类' ? 'success': (scope.row.type === '实践类' ? 'danger': (scope.row.type === '文艺类' ?  'info' : 'primary'))"
                >{{scope.row.type}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="right">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search1" size="mini" placeholder="搜索社团名称" />
              </template>
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleChange(scope.$index, scope.row)"
                >修改社长</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除社团</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br />
          <el-pagination
            background
            layout="prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange1"
            :total="filterClubs1.length"
            :page-size="pageSize"
            :current-page="currentPage1"
            :pager-count="5"
          ></el-pagination>
          <el-dialog title="搜索用户" :visible.sync="dialogTableVisible">
            <el-input placeholder="输入学号搜索用户" v-model="number" class="input-with-search">
              <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
            </el-input>
            <el-table :data="users">
              <el-table-column property="number" label="学号" width="150"></el-table-column>
              <el-table-column property="realname" label="真实姓名" width="200"></el-table-column>
              <el-table-column property="nickname" label="昵称"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="changeChairmans(scope.$index, scope.row)"
                  >选择</el-button>
                </template>
              </el-table-column>
            </el-table>
            <br>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="totalSearchPages"
              :page-size="1"
              :current-page.sync="currentSearchPage"
              @current-change="handleCurrentChangeSearch"
            ></el-pagination>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-scrollbar>
</template>

<script>
let moment = require("moment");
import {
  reqClubsInCheck,
  reqUserInfo,
  reqApproveClub,
  reqAllClubsN,
  reqDeleteClub,
  reqStudentId,
  reqChangeChairman
} from "../../api/index";
export default {
  data: function() {
    return {
      number: "",
      dialogTableVisible: false,
      currentPage: 1,
      pageSize: 6,
      applys: [],
      blist: [],
      clubs: [],
      alist: [],
      users: [],
      search: "",
      search1: "",
      currentPage1: 1,
      totalSearchPages: 1,
      currentSearchPage: 1,
      changeChairman: ""
    };
  },
  methods: {
    async handleEdit(index, row) {
      this.$confirm("批准后将无法撤销，是否确认批准？", "警告", {
        confirmButtonText: "批准",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async action => {
          const result = await reqApproveClub(row.clubId, 2);
          if (result.code === 1) {
            this.$message.success("已批准");
            location.reload();
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch(() => {
          this.$message.info("取消操作");
        });
    },
    async handleChange(index, row) {
      this.changeChairman = row.clubId
      this.number = "";
      this.users = []
      this.dialogTableVisible = true;
      this.searchUser;
    },
    async handleDelete(index, row) {
      this.$confirm(
        "删除后，将删除社团的所有信息包括活动，并且不可恢复，请谨慎删除！",
        "警告",
        {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async action => {
          const result = await reqDeleteClub(row.clubId);
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
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val;
    },
    handleCurrentChangeSearch(val) {
      this.currentSearchPage = val;
      this.searchUser
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
      return row.type === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    async getMessages() {
      // const { myCreates } = this;
      const typeList = { 1: "学术类", 2: "实践类", 3: "文艺类", 4: "体育类" };
      let result = await reqClubsInCheck();
      console.log(result.data);
      for (var i = 0; i < result.data.length; i++) {
        result.data[i].applyTime = moment(result.data[i].applyTime).format(
          "YYYY-MM-DD"
        );
        result.data[i].type = typeList[result.data[i].type];
        const ans = await reqUserInfo(result.data[i].initiatorId);
        result.data[i].realName = ans.data.realname;
        result.data[i].nickName = ans.data.nickname;
        result.data[i].tel = ans.data.tel;
        result.data[i].email = ans.data.email;
        result.data[i].number = ans.data.number;
        result.data[i].profession = ans.data.profession;
      }
      this.applys = result.data;
      this.blist = result.data;
      let allclubs = await reqAllClubsN();
      for (var i = 0; i < allclubs.data.length; i++) {
        allclubs.data[i].applyTime = moment(allclubs.data[i].applyTime).format(
          "YYYY-MM-DD"
        );
        allclubs.data[i].type = typeList[allclubs.data[i].type];
        const ans = await reqUserInfo(allclubs.data[i].initiatorId);
        allclubs.data[i].realName = ans.data.realname;
        allclubs.data[i].nickName = ans.data.nickname;
        allclubs.data[i].tel = ans.data.tel;
        allclubs.data[i].email = ans.data.email;
        allclubs.data[i].number = ans.data.number;
        allclubs.data[i].profession = ans.data.profession;
      }
      this.clubs = allclubs.data;
      this.alist = allclubs.data;
    },
    fliterChange(filters) {
      const filterskey = filters.hosttype;
      this.applys = this.blist;
      if (filterskey.length > 0) {
        this.applys = this.applys.filter(data => {
          return (
            data["type"] === filterskey[0] ||
            data["type"] === filterskey[1] ||
            data["type"] === filterskey[2] ||
            data["type"] === filterskey[3]
          );
        });
      } else {
        this.applys = this.blist;
      }
    },
    fliterChange1(filters) {
      const filterskey = filters.hosttype;
      this.clubs = this.alist;
      if (filterskey.length > 0) {
        this.clubs = this.clubs.filter(data => {
          return (
            data["type"] === filterskey[0] ||
            data["type"] === filterskey[1] ||
            data["type"] === filterskey[2] ||
            data["type"] === filterskey[3]
          );
        });
      } else {
        this.clubs = this.alist;
      }
    },
    async changeChairmans(index, row) {
      const result = await reqChangeChairman(this.changeChairman, row.userId)
      console.log(result)
      if(result.code == 1) {
        this.$message.success("修改成功")
        this.dialogTableVisible = false;
      } else {
        this.$message.error(result.msg)
      }
    }
  },
  async mounted() {
    await this.getMessages();
  },
  computed: {
    filterClubs() {
      const { search, applys } = this;
      let fUnRead;
      fUnRead = applys.filter(
        data =>
          !search || data.name.toLowerCase().includes(search.toLowerCase())
      );
      return fUnRead;
    },
    filterClubs1() {
      const { search1, clubs } = this;
      let fUnRead;
      fUnRead = clubs.filter(
        data =>
          !search1 || data.name.toLowerCase().includes(search1.toLowerCase())
      );
      return fUnRead;
    },
    async searchUser() {
      let result = await reqStudentId(this.number, this.currentSearchPage, 5);
      console.log(result);
      this.users = result.data.content;
      this.totalSearchPages = result.data.totalPages
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-scrollbar {
  width: 100%;
}

.name {
  font-weight: bold;
  color: #FFD04B;
}
</style>