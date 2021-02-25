<template>
  <el-scrollbar>
    <el-main>
      <div content="消息列表">消息列表</div>
      <el-divider></el-divider>
      <el-tabs type="border-card">
        <el-tab-pane label="未读消息">
          <el-table
            :data="filterUnReadMessage(unReadMessage).slice((currentPage - 1)*pageSize, currentPage*pageSize)"
            :default-sort="{prop: 'releaseTime', order: 'descending'}"
            style="width: 100%"
          >
            <el-table-column label="日期" prop="releaseTime" sortable></el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column
              prop="clubId"
              label="社团"
              width="160"
              :filters="[{ text: '行思工作室', value: '行思工作室' }, { text: '滑板协会', value: '滑板协会' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.clubId === '滑板协会' ? 'primary' : 'success'"
                >{{scope.row.clubId}}</el-tag>
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
                >已读</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br />
          <el-pagination
            background
            layout="prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="filterUnReadMessage(unReadMessage).length"
            :page-size="pageSize"
            :current-page="currentPage"
            :pager-count="5"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="已读消息">
          <el-table
            :data="filterUnReadMessage(readMesssages).slice((currentPage1 - 1)*pageSize, currentPage1*pageSize)"
            :default-sort="{prop: 'releaseTime', order: 'descending'}"
            style="width: 100%"
          >
            <el-table-column label="日期" prop="releaseTime" sortable></el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column
              prop="clubId"
              label="社团"
              width="160"
              :filters="[{ text: '行思工作室', value: '行思工作室' }, { text: '滑板协会', value: '滑板协会' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.clubId === '滑板协会' ? 'primary' : 'success'"
                >{{scope.row.clubId}}</el-tag>
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
                >已读</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br />
          <el-pagination
            background
            layout="prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="filterUnReadMessage(readMesssages).length"
            :page-size="pageSize"
            :current-page="currentPage1"
            :pager-count="5"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
      <el-dialog :title="title" :visible.sync="isShownContent" width="55%" center>
        <span v-html="content"></span>
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
    </el-main>
  </el-scrollbar>
</template>

<script>
import { reqGetUserMessage, reqGetMesssageDetail } from "../../api/index";
let moment = require("moment");
export default {
  data() {
    return {
      currentPage: 1,
      currentPage1: 1,
      pageSize: 8,
      unReadMessage: [],
      readMesssages: [],
      search: "",
      content: "",
      isShownContent: false,
      title: ""
    };
  },
  methods: {
    handleEdit(index, row) {
      this.isShownContent = true;
      this.content = row.content;
      this.title = row.title;
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
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    async getMessages() {
      const { unReadMessage, readMesssages } = this;
      var result;
      // console.log(this.$store.state.userMessages);
      if (this.$store.state.userMessages.length === undefined) {
        result = await reqGetUserMessage().data.length;
      } else {
        result = this.$store.state.userMessages;
      }
      for (var i = 0; i < result.length; i++) {
        let id = result[i].messageId;
        let detail = await reqGetMesssageDetail(id);
        detail.data.releaseTime = moment(detail.data.releaseTime).format(
          "YYYY-MM-DD HH:MM:SS"
        );
        // console.log(result[i])
        if (result[i].readTime !== null) {
          this.unReadMessage.push(detail.data);
        } else {
          this.readMesssages.push(detail.data);
        }
      }
    }
  },
  computed: {
    filterUnReadMessage() {
      return function(unReadMessage) {
        // console.log(unReadMessage)
        const { search } = this;
        let fUnRead;
        fUnRead = unReadMessage.filter(
          data =>
            !search || data.title.toLowerCase().includes(search.toLowerCase())
        );
        // console.log(fUnRead);
        return fUnRead;
      };
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