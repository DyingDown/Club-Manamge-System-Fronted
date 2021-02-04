<template>
  <el-scrollbar>
    <el-main>
      <div content="消息列表">消息列表</div>
      <el-divider></el-divider>
      <el-tabs type="border-card">
        <el-tab-pane label="未读消息">
          <el-table
            ref="deleteItems"
            :data="filterUnReadMessage.slice((currentPage - 1)*pageSize, currentPage*pageSize)"
            :default-sort="{prop: 'date', order: 'descending'}"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55" ></el-table-column>
            <el-table-column label="日期" prop="date" sortable></el-table-column>
            <el-table-column label="标题" prop="name"></el-table-column>
            <el-table-column
              prop="tag"
              label="社团"
              width="160"
              :filters="[{ text: '行思工作室', value: '行思工作室' }, { text: '滑板协会', value: '滑板协会' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <el-tag :type="scope.row.tag === '滑板协会' ? 'primary' : 'success'">{{scope.row.tag}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="right">
              <template slot="header"  slot-scope="scope">
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
          <el-button
            class="deleteAll"
            size="mini"
            type="danger"
            @click="(scope.$index, scope.row)"
          >批量删除</el-button>
        </el-tab-pane>
        <el-tab-pane label="已读消息" @click="addDelete">已读消息</el-tab-pane>
      </el-tabs>
    </el-main>
  </el-scrollbar>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 8,
      unReadMessage: [
        {
          date: "2016-05-03",
          name: "1012开会",
          tag: "行思工作室"
        },
        {
          date: "2016-05-02",
          name: "选拔大赛",
          tag: "滑板协会"
        },
        {
          date: "2016-05-04",
          name: "PPT大赛",
          tag: "行思工作室"
        },
        {
          date: "2016-05-01",
          name: "圣诞节Merry活动",
          tag: "行思工作室"
        },
        {
          date: "2016-05-03",
          name: "1012茶话会",
          tag: "行思工作室"
        },
        {
          date: "2016-05-02",
          name: "选美",
          tag: "行思工作室"
        },
        {
          date: "2016-05-04",
          name: "计算机程序设计大赛",
          tag: "行思工作室"
        },
        {
          date: "2016-05-01",
          name: "ICPC-ACM",
          tag: "行思工作室"
        },
        {
          date: "2016-05-03",
          name: "元旦联欢晚会",
          tag: "滑板协会"
        },
        {
          date: "2016-05-02",
          name: "竞选",
          tag: "行思工作室"
        },
        {
          date: "2016-05-04",
          name: "Java讲堂",
          tag: "行思工作室"
        },
        {
          date: "2016-05-01",
          name: "人工智能讲座",
          tag: "行思工作室"
        },
        {
          date: "2016-05-03",
          name: "滑板比赛",
          tag: "滑板协会"
        },
        {
          date: "2016-05-02",
          name: "开会1502",
          tag: "行思工作室"
        },
        {
          date: "2016-05-04",
          name: "互联网+",
          tag: "行思工作室"
        },
        {
          date: "2016-05-01",
          name: "情侣配对",
          tag: "行思工作室"
        },
        {
          date: "2016-05-03",
          name: "1012开会",
          tag: "滑板协会"
        },
        {
          date: "2016-05-02",
          name: "选拔大赛",
          tag: "行思工作室"
        },
        {
          date: "2016-05-04",
          name: "PPT大赛",
          tag: "行思工作室"
        },
        {
          date: "2016-05-01",
          name: "圣诞节Merry活动",
          tag: "行思工作室"
        },
        {
          date: "2016-05-03",
          name: "1012开会",
          tag: "行思工作室"
        },
        {
          date: "2016-05-02",
          name: "选拔大赛",
          tag: "行思工作室"
        },
        {
          date: "2016-05-04",
          name: "PPT大赛",
          tag: "行思工作室"
        },
        {
          date: "2016-05-01",
          name: "圣诞节Merry活动",
          tag: "行思工作室"
        },
        {
          date: "2016-05-03",
          name: "1012开会",
          tag: "行思工作室"
        },
        {
          date: "2016-05-02",
          name: "选拔大赛",
          tag: "行思工作室"
        }
      ],
      deleteItems: [],
      search: "",
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
    },
    addDelete() {
      console.log(this.$refs.deleteItems.selection)
    }
  },
  computed: {
    filterUnReadMessage() {
      const {search, unReadMessage} = this
      let fUnRead
      fUnRead = unReadMessage.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))
      console.log(fUnRead)
      return fUnRead
    }
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