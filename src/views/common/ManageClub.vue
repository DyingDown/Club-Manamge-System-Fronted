<template>
  <el-scrollbar>
    <el-main>
      <div content="社团人员">社团人员</div>
      <el-divider></el-divider>
      <el-tabs type="border-card">
        <el-tab-pane label="社团成员">
          <el-table
            :data="filterClubMembers.slice((currentPage - 1)*pageSize, currentPage*pageSize)"
            :default-sort="{prop: 'date', order: 'descending'}"
            style="width: 100%"
          >
            <el-table-column label="用户名" prop="username" sortable></el-table-column>
            <el-table-column label="电话" prop="tel"></el-table-column>
            <el-table-column prop="time" label="加入时间"></el-table-column>
            <el-table-column align="right">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search1" size="mini" placeholder="Type to search" />
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
          <br/>
          <el-pagination
            background
            layout="prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="filterClubMembers.length"
            :page-size="pageSize"
            :current-page="currentPage"
            :pager-count="5"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="社团管理员">
          <el-table
            :data="clubAdmins.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase())).slice((currentPage - 1)*pageSize, currentPage*pageSize)"
            :default-sort="{prop: 'date', order: 'descending'}"
            style="width: 100%"
          >
            <el-table-column label="用户名" prop="username" sortable></el-table-column>
            <el-table-column label="电话" prop="tel"></el-table-column>
            <el-table-column prop="time" label="加入时间"></el-table-column>
            <el-table-column align="right">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="Type to search" />
              </template>
              <template slot-scope="scope">
                <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button> -->
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="添加管理员">
          <el-form :rules="rules" ref="adminInfo" :model="adminInfo">
            <el-form-item>
              <el-input class="username" v-model="adminInfo.userName">
                <template slot="prepend">学号</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="tel">
              <el-input class="username" v-model="adminInfo.tel">
                <template slot="prepend">电话</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">添加</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="申请加入人员">
          <el-table :data="applys" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <p>真实姓名: {{ props.row.realName }}</p>
                <p>性别: {{ props.row.sex }}</p>
                <p>年级: {{ props.row.grade }}</p>
                <p>专业: {{ props.row.profession }}</p>
                <p>联系电话: {{ props.row.tel }}</p>
                <p>QQ: {{ props.row.qq }}</p>
                <p>自我描述: {{ props.row.description }}</p>
              </template>
            </el-table-column>
            <el-table-column label="申请时间" prop="date" sortable></el-table-column>
            <el-table-column label="申请人" prop="name"></el-table-column>
            <el-table-column label="操作" prop="agree">
              <template slot-scope="scope">
              <el-switch prop 
                v-model="scope.row.agree"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="同意"
                inactive-text="不同意"
              ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="申请人" prop="agree"></el-table-column>
          </el-table>
          <br> 
          <el-pagination
            background
            layout="prev, pager, next"
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :total="applys.length"
            :page-size="pageSize1"
            :current-page="currentPage1"
            :pager-count="5"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-scrollbar>
</template>

<script>
export default {
  data: function() {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
      if (!phoneReg.test(value) && value != "") {
        callback(new Error("电话号码格式不正确"));
      }
      callback();
    };
    return {
      search: "",
      search1: "",
      currentPage: 1,
      pageSize: 8,
      currentPage1: 1,
      pageSize1: 1,
      clubMembers: [
        {
          username: "o_oyao",
          tel: "13949401120",
          time: "2020-12-05"
        },
        {
          username: "tsq",
          tel: "13949401120",
          time: "2020-12-05"
        },
        {
          username: "admain",
          //   tel: "",
          time: "2020-12-05"
        },
        {
          username: "gray",
          tel: "13949401120",
          time: "2020-12-05"
        },
        {
          username: "tsq",
          tel: "13949401120",
          time: "2020-12-05"
        },
        {
          username: "admain",
          //   tel: "",
          time: "2020-12-05"
        },
        {
          username: "gray",
          tel: "13949401120",
          time: "2020-12-05"
        },
        {
          username: "tsq",
          tel: "13949401120",
          time: "2020-12-05"
        },
        {
          username: "admain",
          //   tel: "",
          time: "2020-12-05"
        },
        {
          username: "gray",
          tel: "13949401120",
          time: "2020-12-05"
        }
      ],
      clubAdmins: [
        { username: "haha", tel: "8646864", time: "2012-02-15" },
        { username: "maliu", tel: "8646864", time: "2012-02-15" }
      ],
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
      adminInfo: {
        userName: "",
        tel: ""
      },
      rules: {
        tel: [{ validator: checkPhone, trigger: "blur" }]
      }
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
    handleSizeChange1(val) {
      this.pageSize1 = val;
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
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    }
  },
  computed: {
    filterClubMembers() {
      const {search1, clubMembers} = this
      let fClubMembers
      fClubMembers = clubMembers.filter(data => !search1 || data.username.toLowerCase().includes(search1.toLowerCase()))
      console.log(fClubMembers)
      return fClubMembers
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-scrollbar {
  width: 100%;
}
</style>