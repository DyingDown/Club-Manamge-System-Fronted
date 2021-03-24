<template>
  <el-scrollbar>
    <el-main>
      <div content="消息列表">消息列表</div>
      <el-divider></el-divider>
      <el-tabs type="border-card">
        <el-tab-pane label="消息列表">
          <el-table
            ref="deleteItems"
            :data="filterUnReadMessage.slice((currentPage - 1)*pageSize, currentPage*pageSize)"
            :default-sort="{prop: 'releaseTime', order: 'descending'}"
            style="width: 100%"
            @filter-change="fliterChange"
          >
            <el-table-column label="日期" prop="releaseTime" sortable></el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column
              prop="type"
              label="消息类型"
              width="100"
              :filters="[{ text: '任务', value: '任务' }, { text: '通知', value: '通知' },  { text: '活动', value: '活动' }]"
              :filter-method="filterTag"
              column-key="hosttype"
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
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
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
            :total="filterUnReadMessage.length"
            :page-size="pageSize"
            :current-page="currentPage"
          ></el-pagination>
          <el-dialog :title="title" :visible.sync="isShownContent" width="55%" center>
            <span v-html="content"></span>
            <span slot="footer" class="dialog-footer"></span>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-scrollbar>
</template>

<script>
let moment = require("moment");
import { reqClubMessages, reqDeletMessage } from "../../api/index";
export default {
  data() {
    return {
      isShownContent: false,
      currentPage: 1,
      pageSize: 7,
      clubMessages: [],
      blist: [],
      search: "",
      content: "",
      title: ""
    };
  },
  beforeRouteEnter (to, from, next) {
    console.log(to)
    console.log(from)
    console.log(next);
    next();
  },
  watch: {
    '$route': {
      handler: 'getMessages',
      immediate: true
    }
  },
  methods: {
    handleEdit(index, row) {
      this.isShownContent = true;
      this.content = row.content;
      this.title = row.title;
    },
    handleDelete(index, row) {
      this.$confirm("一旦删除后不可恢复，是否删除？", "警告", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async action => {
          const result = await reqDeletMessage(row.messageId);
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
    filterTag(value, row) {
      return row.type === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    async getMessages() {
      const { clubMessages } = this;
      const typeList = { 1: "任务", 2: "通知", 3: "活动" };
      const result = await reqClubMessages(window.location.href.split("=")[1]);
      for (var i = 0; i < result.data.length; i++) {
        result.data[i].releaseTime = moment(result.data[i].releaseTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        result.data[i].type = typeList[result.data[i].type];
      }
      this.clubMessages = result.data;
      this.clubMessages = this.clubMessages.filter(function(e) {
        return e.draftMark === false;
      });
      this.blist = this.clubMessages
    },
    addDelete() {
      console.log(this.$refs.deleteItems.selection);
    },
    fliterChange(filters) {
      console.log(filters)
      const filterskey = filters.hosttype;
      this.clubMessages = this.blist
      if (filterskey.length > 0) {
        this.clubMessages = this.clubMessages.filter(data => {
          return (data["type"] === filterskey[0]) || (data["type"] === filterskey[1]) || (data["type"] === filterskey[2]);
        });
        // this.clubMessages = this.blist;
      } else {
        this.clubMessages = this.blist;
      }
    }
  },
  computed: {
    filterUnReadMessage() {
      const { search, clubMessages } = this;
      let fUnRead;
      fUnRead = clubMessages.filter(
        data =>
          !search || data.title.toLowerCase().includes(search.toLowerCase())
      );
      return fUnRead;
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

.deleteAll {
  float: right;
}
</style>