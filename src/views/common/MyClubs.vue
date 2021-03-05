<template>
  <el-scrollbar>
    <el-main>
      <div content="消息列表">我申请加入的社团</div>
      <el-divider></el-divider>
      <el-table
        :data="myApplyClubs.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        :default-sort="{prop: 'date', order: 'descending'}"
        style="width: 100%"
      >
        <el-table-column label="申请日期" prop="applyTime" sortable></el-table-column>
        <el-table-column label="社团名称" prop="name"></el-table-column>
        <el-table-column
          prop="type"
          label="社团类型"
          width="100"
          :filters="[{ text: '学术类', value: '学术类' }, { text: '实践类', value: '实践类' }, { text: '文艺类', value: '文艺类' }, { text: '体育类', value: '体育类' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.type === '学术类' ? 'success': (scope.row.type === '实践类' ? 'danger': (scope.row.type === '文艺类' ?  'info' : 'primary'))"
            >{{scope.row.type}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" prop="role"></el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="Type to search" />
          </template>
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看进度</el-button> -->
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">退出</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-scrollbar>
</template>

<script>
let moment = require("moment");
import { reqMyCreateClub, reqDeleteMember } from "../../api/index.js";
export default {
  data() {
    return {
      search: "",
      myApplyClubs: []
    };
  },
  methods: {
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("确定推出社团？", "警告", {
        confirmButtonText: "退出",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async action => {
          const result = await reqDeleteMember(row.clubId,this.$store.state.userInfo.userId);
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
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    filterTag(value, row) {
      return row.type === value;
    },
    async getMessages() {
      const { myCreates } = this;
      const result = await reqMyCreateClub();
      this.myCreates = result.data;
      const typeList = { 1: "学术类", 2: "实践类", 3: "文艺类", 4: "体育类" };
      const Lista = { 0: "已加入", 1: "已加入", 2: "已加入", 3: "已申请" };
      this.myApplyClubs = JSON.parse(JSON.stringify(this.$store.state.myClubs));
      for (var i = 0; i < this.myApplyClubs.length; i++) {
        this.myApplyClubs[i].applyTime = moment(this.myApplyClubs[i].applyTime).format(
          "YYYY-MM-DD HH:MM"
        );
        this.myApplyClubs[i].type = typeList[this.myApplyClubs[i].type];
        this.myApplyClubs[i].role = Lista[this.myApplyClubs[i].role];
      }
    }
  },
  async mounted() {
    await this.getMessages();
  }
};
</script>

<style lang="stylus" scoped>
.el-scrollbar {
  width: 100%;
}
</style>