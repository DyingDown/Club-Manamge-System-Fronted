<template>
  <el-scrollbar>
    <el-main>
      <!-- <div content="所有社团">所有社团</div>
      <el-divider></el-divider>-->
      <el-row :gutter="30">
        <el-col :span="12" v-for="(o) in clubs" :key="o">
          <el-card shadow="hover">
            <el-avatar class="card-avatar" :size="125" :src="o.avatarId" shape="square"></el-avatar>
            <div class="card-info">
              <span class="card-name">社团名称：</span>
              {{o.name}}
              <br/>
              <span class="card-name">社团类型：</span>
              {{o.type}}
            </div>
            <br />
            <br />
            <div>
              <span class="card-name">社团简介：</span>
              {{o.introduction}}
            </div>
            <br>
            <el-button type="primary">加入我们</el-button>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-scrollbar>
</template>

<script>
import { reqAllClubs } from "../../api/index";
export default {
  data() {
    return {
      clubs: []
    };
  },
  methods: {
    async getMessages() {
      // const { myCreates } = this;
      const typeList = { 1: "学术类", 2: "实践类", 3: "文艺类", 4: "体育类" };
      const result = await reqAllClubs();
      for (var i = 0; i < result.data.length; i++) {
        //   result.data[i].releaseTime = moment(result.data[i].releaseTime).format(
        //     "YYYY-MM-DD HH:mm:ss"
        //   );
        result.data[i].type = typeList[result.data[i].type];
      }
      this.clubs = result.data;
      this.clubs = this.clubs.filter(function(e) {
        e.avatarId = "http://localhost:8080/api/image/" + e.avatarId;
        return e.progress === 3;
      });
      console.log(this.clubs);
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
// margin-top: 13px;
// line-height: 12px;
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
  overflow:hidden
}

.el-card {
  line-height: 30px;
  height: 100%
}

.card-avatar {
  float: right;
  margin: 0 0 20px 20px;
  border: solid #f0f2f7 1px;
}

.card-info {
  float: left;
}

.card-name {
  font-weight: bold;
  color: #FFD04B;
}

.el-button
  text-align right
</style> 