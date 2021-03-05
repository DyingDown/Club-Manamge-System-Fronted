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
            <el-avatar :size="40" :src="circleUrl"></el-avatar>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <el-badge :is-dot="messageNum > 0 ? true: false" class="item">{{userInfo.nickname}}</el-badge>
            </template>
            <el-menu-item index="changepassword" @click="toPage('/changepassword')">修改密码</el-menu-item>
            <el-menu-item index="myclubs" @click="toPage('/myclubs')">我的社团</el-menu-item>
            <el-menu-item index="profile" @click="toPage('/profile')">个人中心</el-menu-item>
            <el-menu-item index="message" @click="toPage('/message')">
              <el-badge :value="messageNum" :max="99" class="badge_number">我的消息</el-badge>
            </el-menu-item>
            <el-menu-item index="3-4" @click="logout">退出</el-menu-item>
          </el-submenu>
          <el-menu-item disabled index="4">|</el-menu-item>
          <el-menu-item
            disabled
            index="5"
          >{{userType == 0 ? '社长' : (userType == 1 ? '管理员' : (userType == 2 ? '社员' : '自由人'))}}</el-menu-item>
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
              <el-menu-item-group
                v-for="(club, key) in myClubs"
                :key="key"
                :title="club.name"
              > 
                <!-- <el-menu-item :index="generateId('clubnews', club.clubName)">社团新闻</el-menu-item> -->
                <el-menu-item
                  :index="generateId('clubmessage', club.clubId)"
                  @click="toPage('/clubmessage', club.clubId)"
                >社团活动</el-menu-item>
                <!-- <el-menu-item :index="generateId(key, 3)" v-if="club.memberType=='社长'">财务管理</el-menu-item> -->
                <el-menu-item
                  v-if="club.role == 1 || club.role == 0"
                  :index="generateId('manageclub', club.clubId)"
                  @click="toPage('/manageclub', club.clubId)"
                >社团管理</el-menu-item>
                <el-submenu v-if="club.role == 1 || club.role == 0" :index="generateId(key, 5)">
                  <template slot="title">
                    <span>消息管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item
                      v-if="club.role == 1 || club.role == 0"
                      @click="toPage('/postmessage', club.clubId)"
                      :index="generateId('postmessage', club.clubId)"
                    >发布新消息</el-menu-item>
                    <el-menu-item
                      v-if="club.role == 1 || club.role == 0"
                      @click="toPage('/postdrafts', club.clubId)"
                      :index="generateId('postdrafts', club.clubId)"
                    >草稿箱</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item
              index="allclubs"
              v-if="$store.state.userInfo.number != 'admin'"
              @click="toPage('/allclubs')"
            >
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

            <el-menu-item
              index="clubmanagement"
              v-if="$store.state.userInfo.number == 'admin'"
              @click="toPage('/clubmanagement')"
            >
              <i class="el-icon-s-tools"></i>
              <span>社团管理</span>
            </el-menu-item>
          </el-menu>
          <!-- </el-col> -->
        </el-row>
      </el-aside>
      <!-- <el-main>
        <div></div>
      </el-main>-->
      <router-view v-if="dataReady" />
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import {
  reqUserInfo,
  reqIsLogged,
  reqGetImage,
  reqGetUserMessage,
  reqMyClubs,
  reqClubInfo,
  reqLogout
} from "../api/index.js";
export default {
  data() {
    return {
      dataReady: false,
      activeIndex: "",
      currentFunc: "UserInfo",
      userType: 3,
      messageNum: 10,
      userName: "John Doe",
      circleUrl: "",
      myClubs: []
    };
  },
  methods: {
    generateId(key, key1, key2 = "") {
      return key + "-" + key1;
    },
    toPage(paths, sub = "") {
      if (sub !== "") this.$router.push({ path: paths + `?club=${sub}` });
      else this.$router.push({ path: paths });
    },
    async isLogged() {
      const result = await reqIsLogged();
      // console.log(result)
      if (result.code === 1) {
        this.$store.state.userInfo.userId = result.data;
        const userinfo = await reqUserInfo(result.data);
        this.$store.dispatch("recordUser", userinfo.data);
        if (this.$store.state.userInfo.avatarId == null)
          this.$store.state.userInfo.avatarId = 26;
        this.circleUrl =
          "http://localhost:8080/api/image/" +
          this.$store.state.userInfo.avatarId;
        let messageNums, unRead;
        reqGetUserMessage().then(res => {
          messageNums = res;
          this.$store.dispatch("recordUserMessage", messageNums.data);
          unRead = messageNums.data.filter(function(e) {
            return e.readTime === null;
          });
        this.messageNum = unRead.length;
        });
        let myClubs = await reqMyClubs();
        for(var i = 0; i < myClubs.data.length; i ++) {
          let temp = await reqClubInfo(myClubs.data[i].clubId);
          myClubs.data[i] = Object.assign(myClubs.data[i],temp.data)
          this.userType = Math.min(myClubs.data[i].role, this.userType);
        }
        myClubs.data = myClubs.data.filter(data => ( data.progress == 3));
        // console.log(myClubs.data);
        this.$store.dispatch("recordMyJoinedClubs", myClubs.data);
        myClubs.data = myClubs.data.filter(data => ( data.role != 3));
        this.myClubs = myClubs.data
        // location.reload()
      } else {
        this.$router.replace({ path: "/login" });
      }
    },
    async logout() {
      const result = await reqLogout();
      if (result.code == 1) {
        this.$router.replace({ path: "/login" });
        this.$message.success("退出成功");
      } else {
        this.$message.error("请重试");
      }
    }
  },
  async mounted() {
    await this.isLogged();
    this.activeIndex = window.location.href.split("/")[3].split("?")[0];
    if (window.location.href.split("=").length != 1) {
      this.activeIndex += "-" + decodeURI(window.location.href.split("=")[1]);
    }
    this.dataReady = true;
  },
  computed: {
    ...mapState(["userInfo"])
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

// .quit
  // float: left
</style>