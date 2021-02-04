<template>
  <el-container class="outer">
    <el-header>
      <!-- <el-col :span="18"> -->
      <div class="position">Processing Center</div>
      <!-- </el-col> -->
      <div class="header">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="2">
            <el-avatar :size="35" :src="circleUrl"></el-avatar>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <el-badge :is-dot="messageNum" class="item">{{userName}}</el-badge>
            </template>
            <el-menu-item index="3-1">我的社团</el-menu-item>
            <el-menu-item index="profile" @click="toPage('/profile')">个人中心</el-menu-item>
            <el-menu-item index="message" @click="toPage('/message')">
              <el-badge :value="messageNum" :max="99" class="badge_number">我的消息</el-badge>
            </el-menu-item>
            <el-menu-item index="3-4">退出</el-menu-item>
          </el-submenu>
          <el-menu-item disabled index="4">|</el-menu-item>
          <el-menu-item disabled index="5">{{userType}}</el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-container>
      <el-aside>
        <el-row class="tac">
          <!-- <el-col :span="4"> -->
          <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="home" @click="toPage('/home')">
              <i class="el-icon-s-home"></i>
              <span>主页</span>
            </el-menu-item>
            <el-submenu index="myclubs">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>我的社团</span>
              </template>
              <el-menu-item-group v-for="(club, key) in myClubs" :key="key" :title="club.clubName">
                <!-- <el-menu-item :index="generateId('clubnews', club.clubName)">社团新闻</el-menu-item> -->
                <el-menu-item
                  :index="generateId('clubmessage', club.clubName)"
                  @click="toPage('/clubmessage', club.clubName)"
                >社团活动</el-menu-item>
                <!-- <el-menu-item :index="generateId(key, 3)" v-if="club.memberType=='社长'">财务管理</el-menu-item> -->
                <el-menu-item
                  v-if="club.memberType=='社长'"
                  :index="generateId('manageclub', club.clubName)"
                  @click="toPage('/manageclub', club.clubName)"
                >社团管理</el-menu-item>
                <el-submenu v-if="club.memberType=='社长'" :index="generateId(key, 5)">
                  <template slot="title">
                    <span>消息管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item
                      v-if="club.memberType=='社长'"
                      @click="toPage('/postmessage', club.clubName)"
                      :index="generateId('postmessage', club.clubName)"
                    >发布新消息</el-menu-item>
                    <el-menu-item
                      v-if="club.memberType=='社长'"
                      @click="toPage('/postdrafts', club.clubName)"
                      :index="generateId('postdrafts', club.clubName)"
                    >草稿箱</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="allclubs" @click="toPage('/allclubs')">
              <i class="el-icon-star-on"></i>
              <span>加入社团</span>
            </el-menu-item>
            <el-menu-item index="message" @click="toPage('/message')">
              <i class="el-icon-message"></i>
              <span>消息</span>
            </el-menu-item>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-circle-plus"></i>
                <span>创建社团</span>
              </template>
              <!-- <el-menu-item-group> -->
              <el-menu-item index="mycreates" @click="toPage('/mycreates')">我申请的</el-menu-item>
              <el-menu-item index="createclub" @click="toPage('/createclub')">新建</el-menu-item>
              <!-- </el-menu-item-group> -->
            </el-submenu>
          </el-menu>
          <!-- </el-col> -->
        </el-row>
      </el-aside>
      <!-- <el-main>
        <div></div>
      </el-main>-->
      <router-view />
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "",
      currentFunc: "UserInfo",
      userType: "社长",
      messageNum: 10,
      userName: "John Doe",
      circleUrl: require("@/assets/user.png"),
      myClubs: [
        {
          clubName: "行思工作室",
          memberType: "社长"
        },
        {
          clubName: "滑板协会",
          memberType: "社员"
        }
      ]
    };
  },
  methods: {
    generateId(key, key1, key2 = "") {
      return key + '-' + key1;
    },
    toPage(paths, sub = "") {
      if(sub != "")
        this.$router.push({ path: paths + `?club=${sub}` });
      else
        this.$router.push({ path: paths });
    }
  },
  mounted() {
    this.activeIndex = window.location.href.split("/")[3].split("?")[0];
    if (window.location.href.split("=").length != 1) {
      this.activeIndex += '-' + decodeURI(window.location.href.split("=")[1]);
    }
    console.log(this.activeIndex)
  }
};
</script>

<style  lang="stylus" scoped>
.outer {
  height: 100%;
}

.el-aside, .el-header {
  background-color: #545c64;
}

.el-header {
  padding: 0 25px;
  border-bottom: solid 1px gray;
}

.el-menu {
  border-right: none !important;
}

.position, .el-breadcrumb {
  height: 60px;
  line-height: 60px;
  color: #909399;
}

.el-badge .el-badge__content {
  top: 10px !important;
}

.el-header {
  display: flex;
  justify-content: space-between;
}
</style>