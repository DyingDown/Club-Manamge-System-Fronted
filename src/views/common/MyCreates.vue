<template>
  <el-scrollbar>
    <el-main>
      <div content="消息列表">我申请的社团</div>
      <el-divider></el-divider>
          <el-table
            :data="myCreates.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
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
            <el-table-column align="right">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="Type to search" />
              </template>
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看进度</el-button>
                <!-- <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >已读</el-button> -->
              </template>
            </el-table-column>
          </el-table>
    </el-main>
  </el-scrollbar>
</template>

<script>
let moment = require("moment");
import { reqMyCreateClub } from "../../api/index.js";
export default {
  data() {
    return {
        search: "",
        myCreates: []
    };
  },
  methods: {
    handleEdit(index, row) {
      this.$store.dispatch("recordEditClub", row);
      this.$router.push( {path: "/createclub"})
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
      const { myCreates } = this;
      const result = await reqMyCreateClub();
      this.myCreates = result.data
      const typeList = { 1: '学术类', 2: '实践类', 3: '文艺类', 4: '体育类' };
      for (var i = 0; i < this.myCreates.length; i++) {
        this.myCreates[i].applyTime = moment(this.myCreates[i].applyTime).format(
          "YYYY-MM-DD HH:MM"
        );
        this.myCreates[i].type = typeList[this.myCreates[i].type]
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