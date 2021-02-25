<template>
  <el-scrollbar>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>最新公告</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="$router.push({ path: '/message' })">查看详情</el-button>
            </div>
            <el-table
              ref="deleteItems"
              :data="unReadMessage"
              :default-sort="{prop: 'date', order: 'descending'}"
              style="width: 100%"
            >
              <el-table-column label="日期" prop="releaseTime"></el-table-column>
              <el-table-column label="标题" prop="title"></el-table-column>
            </el-table>
          </el-card>
          <br />
          <el-card class="box-card">  
            <el-table :data="loginDate" style="width: 100%">
              <el-table-column prop="name" label="登录信息" width="180"></el-table-column>
              <el-table-column prop="key"></el-table-column>
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
import { reqGetUserMessage, reqGetMesssageDetail } from "../../api/index";
let moment = require("moment");
export default {
  data: function() {
    return {
      loginDate: [
        {
          name: "登录时间：",
          key: "2021-01-12"
        },
        {
          name: "IP地址：",
          key: "12.456.545"
        },
        {
          name: "登录设备：",
          key: "Chrome-87.0.4280.141"
        }
      ],
      unReadMessage: []
    };
  },
  methods: {
    async getMessages() {
      const { unReadMessage } = this;
      var result;
      console.log(this.$store.state.userMessages)
      if(this.$store.state.userMessages.length === undefined){
        result = await reqGetUserMessage().data.length;
      } else {
        result = this.$store.state.userMessages
      }
      for (var i = 0; i < result.length; i++) {
        if (result[i].readTime !== null) {
          let id = result[i].messageId;
          let detail = await reqGetMesssageDetail(id);
            detail.data.releaseTime = moment(detail.data.releaseTime).format(
              "YYYY-MM-DD"
            );
          this.unReadMessage.push(detail.data);
        }
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