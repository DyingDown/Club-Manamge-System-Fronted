<template>
  <el-scrollbar>
    <el-main>
      <div content="所有社团">所有社团</div>
      <el-divider></el-divider>
      <el-row :gutter="30">
        <el-col :span="6" v-for="(o) in 8" :key="o">
          <el-card :body-style="{ padding: '0px' }">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            />
            <div style="padding: 14px;">
              <span>Yummy hamburger</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="primary" plain class="button" size="small">加入</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-scrollbar>
</template>

    <script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
.el-scrollbar {
  width: 100%;
}

.main-content {
  width: 80%;
  margin: auto;
}

.username {
  width: 250px;
}

.time {
  font-size: 13px;
  color: #999;
}

// .bottom {
//   margin-top: 13px;
//   line-height: 12px;
// }

.button {
  // padding: 10px;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before, .clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}

.el-col {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style> 