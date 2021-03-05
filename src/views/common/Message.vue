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
            @filter-change="fliterChange"
          >
            <el-table-column label="日期" prop="releaseTime" sortable></el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column
              prop="clubId"
              label="社团"
              width="160"
              :filters="filters"
              :filter-method="filterTag"
              filter-placement="bottom-end"
              column-key="hosttype"
            >
              <template slot-scope="scope">
                <el-tag :type="tagType(scope.row.clubName)">{{scope.row.clubName}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="right">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="Type to search" />
              </template>
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                <el-button size="mini" type="danger" @click="Read(scope.$index, scope.row)">已读</el-button>
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
            @filter-change="fliterChange1"
          >
            <el-table-column label="日期" prop="releaseTime" sortable></el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column
              prop="clubId"
              label="社团"
              width="160"
              :filters="filters"
              :filter-method="filterTag"
              filter-placement="bottom-end"
              column-key="hosttype"
            >
              <template slot-scope="scope">
                <el-tag :type="tagType(scope.row.clubName)">{{scope.row.clubName}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="right">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="Type to search" />
              </template>
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br />
          <el-pagination
            background
            layout="prev, pager, next"
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
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
import {
  reqGetUserMessage,
  reqGetMesssageDetail,
  reqReadMessage,
  reqClubInfo
} from "../../api/index";
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
      title: "",
      filters: [],
      blist: [],
      alist: []
    };
  },
  methods: {
    handleEdit(index, row) {
      this.isShownContent = true;
      this.content = row.content;
      this.title = row.title;
      reqReadMessage(row.clubId);
    },
    async Read(index, row) {
      const result = await reqReadMessage(row.messageId);
      location.reload();
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange1(val) {
      this.pageSize = val;
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
      return row.clubName === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    tagType(value) {
      var type = ["success", "danger", "info", "warning", ""];
      for (var i = 0; i < this.filters.length; i++) {
        if (this.filters[i].value == value) {
          return type[i % 5];
        }
      }
    },
    async getMessages() {
      const { unReadMessage, readMesssages } = this;
      var result;
      let filter = [];
      if (this.$store.state.userMessages.length === undefined) {
        result = await reqGetUserMessage().data;
      } else {
        result = this.$store.state.userMessages;
      }
      for (var i = 0; i < result.length; i++) {
        let id = result[i].messageId;
        let detail = await reqGetMesssageDetail(id);
        let clubInfo;
        let a = reqClubInfo(detail.data.clubId).then(response => {
          clubInfo = response.data;

          detail.data.releaseTime = moment(detail.data.releaseTime).format(
            "YYYY-MM-DD HH:MM:SS"
          );
          detail.data.clubName = clubInfo.name;
          filter.push({
            text: detail.data.clubName,
            value: detail.data.clubName
          });
        });
        // console.log(detail)
        if (result[i].readTime === null) {
          this.unReadMessage.push(detail.data);
        } else {
          this.readMesssages.push(detail.data);
        }
        this.blist = this.unReadMessage;
        this.alist = this.readMesssages;
      }
      // console.log(filter);
      // this.filters = Array.from(filter);
      this.filters = Array.from(new Set(filter.map(a => a.text))).map(text => {
        return filter.find(a => a.text === text);
      });
    },
    fliterChange(filters) {
      const filterskey = filters.hosttype;
      this.unReadMessage = this.blist;
      if (filterskey.length > 0) {
        this.unReadMessage = this.unReadMessage.filter(data => {
          for (var i = 0; i < filterskey.length; i++) {
            if (data["clubName"] === filterskey[i]) return true;
          }
          return false;
        });
        // this.clubMessages = this.blist;
      } else {
        this.unReadMessage = this.blist;
      }
    },
    fliterChange1(filters) {
      const filterskey = filters.hosttype;
      this.readMesssages = this.alist;
      if (filterskey.length > 0) {
        this.readMesssages = this.readMesssages.filter(data => {
          for (var i = 0; i < filterskey.length; i++) {
            if (data["clubName"] === filterskey[i]) return true;
          }
          return false;
        });
        // this.clubMessages = this.blist;
      } else {
        this.readMesssages = this.alist;
      }
    }
  },
  computed: {
    filterUnReadMessage() {
      return function(unReadMessage) {
        const { search } = this;
        let fUnRead;
        fUnRead = unReadMessage.filter(
          data =>
            !search || data.title.toLowerCase().includes(search.toLowerCase())
        );
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