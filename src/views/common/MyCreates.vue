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
            <el-table-column label="申请日期" prop="date" sortable></el-table-column>
            <el-table-column label="社团名称" prop="name"></el-table-column>
            <el-table-column
              prop="tag"
              label="社团类型"
              width="100"
              :filters="[{ text: '学术类', value: '学术类' }, { text: '实践类', value: '实践类' }, { text: '文艺类', value: '文艺类' }, { text: '体育类', value: '体育类' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.tag === '学术类' ? 'success': (scope.row.tag === '实践类' ? 'danger': (scope.row.tag === '艺术类' ?  'info' : 'primary'))"
                >{{scope.row.tag}}</el-tag>
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
export default {
  data() {
    return {
        search: "",
        myCreates: [
            {
                date: "2020-12-05",
                name: "电影社团",
                tag: "实践类"
            },
            {
                date: "2020-12-06",
                name: "嘻哈社团",
                tag: "艺术类"
            },
            {
                date: "2020-12-07",
                name: "太极拳社团",
                tag: "体育类"
            },
            {
                date: "2020-12-08",
                name: "计算机社团",
                tag: "学术类"
            }
        ]
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