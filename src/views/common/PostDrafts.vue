<template>
  <el-scrollbar>
    <el-main>
      <div content="消息列表">草稿箱</div>
      <el-divider></el-divider>
      <el-table
        :data="myCreates.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
        :default-sort="{prop: 'date', order: 'descending'}"
        style="width: 100%"
      >
        <el-table-column label="创建日期" prop="releaseTime" sortable></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column
          prop="type"
          label="消息类型"
          width="100"
          :filters="[{ text: '任务', value: '任务' }, { text: '通知', value: '通知' },  { text: '活动', value: '活动' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.type === '任务' ?'success' : (scope.row.type === '通知' ? 'info' : 'primary') "
            >{{scope.row.type}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="Type to search" />
          </template>
          <template slot-scope="scope">
            <el-button type="default" size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button type="primary" size="mini" @click="handleRelease(scope.$index, scope.row)">发布</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-scrollbar>
</template>

<script>
let moment = require("moment");
import {
  reqClubMessages,
  reqDeletMessage,
  reqPostDraft
} from "../../api/index";
export default {
  data() {
    return {
      myCreates: [],
      search: ""
    };
  },
  methods: {
    handleEdit(index, row) {
      // console.log(index, row);
      this.$store.dispatch("recordEditMessage", row);
      // console.log(this.$store.state.currentEditMessage)
      this.$router.push({ path: "/postmessage?club_id=1" });
    },
    async handleRelease(index, row) {
      this.$confirm("确定发布？", "警告", {
        confirmButtonText: "发布",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(async action => {
          const result = await reqPostDraft(row.messageId, false);
          // console.log(result);
          if (result.code == 1) {
            this.$message.success("发布成功");
            location.reload();
          } else this.$message.error("发布失败");
        })
        .catch(action => {
          this.$message.info("取消发布");
        });
    },
    handleDelete(index, row) {
      this.$confirm("一旦删除后不可恢复，是否删除？", "警告", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async action => {
          const result = await reqDeletMessage(row.messageId);
          // console.log(result);
          if (result.code == 1) {
            this.$message.success("删除成功");
            location.reload();
          } else this.$message.error("删除失败");
        })
        .catch(action => {
          this.$message.info("取消删除");
        });
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
      const { myCreates } = this;
      const typeList = { 1: "任务", 2: "通知", 3: "活动" };
      const result = await reqClubMessages("1");
      for (var i = 0; i < result.data.length; i++) {
        result.data[i].releaseTime = moment(result.data[i].releaseTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        result.data[i].type = typeList[result.data[i].type];
      }
      this.myCreates = result.data;
      this.myCreates = this.myCreates.filter(function(e) {
        return e.draftMark === true;
      });
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