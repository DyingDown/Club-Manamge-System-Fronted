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
            @filter-change="fliterChange">
            <el-table-column type="expand">
              <template slot-scope="props">
                <p><span class="name">真实姓名:</span>  {{ props.row.realName }}</p>
                <p><span class="name">申请人学号:</span> {{ props.row.number }}</p>
                <p><span class="name">申请人专业:</span> {{ props.row.profession }}</p>
                <p><span class="name">联系电话:</span> {{ props.row.tel }}</p>
                <p><span class="name">指导老师姓名:</span> {{ props.row.consultantName }}</p>
                <p><span class="name">指导老师电话:</span> {{ props.row.consultantTel }}</p>
                <p><span class="name">社团宗旨:</span> {{ props.row.coreValues }}</p>
                <p><span class="name">主要活动计划:</span> {{ props.row.plans }}</p>
                <p><span class="name">可行性分析:</span> {{ props.row.practicallyAnalysis }}</p>
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
                <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">批准同意</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br> 
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
      </el-tabs>
    </el-main>
  </el-scrollbar>
</template>

<script>
let moment = require("moment");
import { reqClubsInCheck, reqUserInfo, reqApproveClub } from "../../api/index";
export default {
  data: function() {
    return {
      currentPage: 1,
      pageSize: 4,
      applys: [
        {
          date: "2016-05-03",
          name: "Tom",
          realName: "California",
          profession: "Los Angeles",
          tel: "No. 189, Grove St, Los Angeles",
          description: "CA 90036",
          agree: true
        },
        {
          date: "2016-05-02",
          name: "Tom",
          realName: "California",
          profession: "Los Angeles",
          tel: "No. 189, Grove St, Los Angeles",
          description: "CA 90036",
          agree: true
        },
        {
          date: "2016-05-04",
          name: "Tom",
          realName: "California",
          profession: "Los Angeles",
          tel: "No. 189, Grove St, Los Angeles",
          description: "CA 90036"
        },
        {
          date: "2016-05-01",
          name: "Tom",
          realName: "California",
          profession: "Los Angeles",
          tel: "No. 189, Grove St, Los Angeles",
          description: "CA 90036"
        },
        {
          date: "2016-05-08",
          name: "Tom",
          realName: "California",
          profession: "Los Angeles",
          tel: "No. 189, Grove St, Los Angeles",
          description: "CA 90036"
        },
        {
          date: "2016-05-06",
          name: "Tom",
          realName: "California",
          profession: "Los Angeles",
          tel: "No. 189, Grove St, Los Angeles",
          description: "CA 90036"
        },
        {
          date: "2016-05-07",
          name: "Tom",
          realName: "California",
          profession: "Los Angeles",
          tel: "No. 189, Grove St, Los Angeles",
          description: "CA 90036"
        }
      ],
      blist: [],
      search: ""
    };
  },
  methods: {
    async handleEdit(index, row) {
      console.log(index, row);
      this.$confirm(
        "批准后将无法撤销，是否确认批准？",
        "警告",
        {
          confirmButtonText: "批准",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async action => {
          const result = await reqApproveClub(row.clubId, 2);
            if (result.code === 1) {
              this.$message.success("已批准");
            } else {
              this.$message.error(result.msg);
            }
            location.reload();
        })
        .catch(() => {
          this.$message.info("取消操作");
        });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
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
      for (var i = 0; i < result.data.length; i++) {
          result.data[i].applyTime = moment(result.data[i].applyTime).format(
            "YYYY-MM-DD"
          );
        result.data[i].type = typeList[result.data[i].type];
        const ans = await reqUserInfo(result.data[i].initiatorId)
        // console.log(ans.data)
        result.data[i].realName = ans.data.realname
        result.data[i].nickName = ans.data.nickname
        result.data[i].tel = ans.data.tel
        result.data[i].email = ans.data.email
        result.data[i].number = ans.data.number
        result.data[i].profession = ans.data.profession
      }
      this.applys = result.data;
      this.blist = result.data
    //   this.applys = this.applys.filter(function(e) {
    //     e.avatarId = "http://localhost:8080/api/image/" + e.avatarId;
    //     return e.progress === 3;
    //   });
      console.log(this.applys);
    },
    fliterChange(filters) {
      const filterskey = filters.hosttype;
      console.log(this.applys);
      this.applys = this.blist
      if (filterskey.length > 0) {
        this.applys = this.applys.filter(data => {
          return (data["type"] === filterskey[0]) || (data["type"] === filterskey[1]) || (data["type"] === filterskey[2] || (data["type"] === filterskey[3]));
        });
        console.log(filterskey);
        // this.clubMessages = this.blist;
      } else {
        this.applys = this.blist;
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