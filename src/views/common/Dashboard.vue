<template>
  <el-scrollbar>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>最新公告</span>
              <el-button style="float: right; padding: 3px 0" type="text">全部已读</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">{{'List item ' + o }}</div>
          </el-card>
          <br>
          <el-card class="box-card">
            <!-- <div slot="header" class="clearfix">
              <span>登录信息</span>
            </div> -->
            <el-table :data="loginDate" style="width: 100%">
              <el-table-column prop="name" label="登录信息" width="180"></el-table-column>
              <el-table-column prop = "key"></el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <el-calendar></el-calendar>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-scrollbar>
</template>

<script>
export default {
  data: function() {
    return {
      loginDate: [{
        name: "登录时间：",
        key: "2021-01-12",
      },
      {
        name: "IP地址：",
        key: "12.456.545"
      },
      {
        name: "登录设备：",
        key: "Chrome-87.0.4280.141"
      }]
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-scrollbar {
  width: 100%;
}
</style>