<template>
  <el-scrollbar>
    <el-main>
      <div content="消息列表">草稿箱</div>
      <el-divider></el-divider>
          <el-table
            :data="myCreates.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            :default-sort="{prop: 'date', order: 'descending'}"
            style="width: 100%"
          >
            <el-table-column label="创建日期" prop="date" sortable></el-table-column>
            <el-table-column label="标题" prop="name"></el-table-column>
            <el-table-column
              prop="tag"
              label="消息类型"
              width="100"
              :filters="[{ text: '任务', value: '任务' }, { text: '通知', value: '通知' },  { text: '活动', value: '活动' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.tag === '任务' ?'success' : (scope.row.tag === '通知' ? 'info' : 'primary') "
                >{{scope.row.tag}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="right">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="Type to search" />
              </template>
              <template slot-scope="scope">
                <el-button type="default" size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">发布</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
    </el-main>
  </el-scrollbar>
</template>

<script>
export default {
  data() {
    return {
        myCreates: [
            {
                date: "2020-12-05",
                name: "开会",
                tag: "通知"
            },
            {
                date: "2020-12-06",
                name: "比赛",
                tag: "任务"
            },
            {
                date: "2020-12-07",
                name: "团建",
                tag: "活动"
            },
            {
                date: "2020-12-08",
                name: "开会",
                tag: "任务"
            }
        ],
        search: ""
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
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
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-scrollbar {
  width: 100%;
}
</style>