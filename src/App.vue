<template>  
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="stylus">
body
  margin: 0

html,body,#app,.el-container{
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
    /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100%;
}

.el-badge .el-badge__content
  top: 15px !important
.badge_number .el-badge__content
  right: -10px !important

.el-textarea textarea
  height: 150px !important

.ql-editor
  height: 350px !important
</style>

<script>
import Login from "./views/Login"
import UserInfo from "./views/common/UserInfo"
export default {
  components: {
    Login
  },
  subRoutes: {
    name: 'userInfo',
    compnent: UserInfo
  }
}
</script>
