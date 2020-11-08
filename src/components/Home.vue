<template>
  <div>
    <el-container>
      <el-header style="background-color: rgb(238, 241, 246)" type="flex">
        <div class="home-header" style="float: left;">
          <span style="font-size:28px">股票分析系统</span>
        </div>
        <div class="home-header" style="float: right">
          <el-button type="primary" @click="logout()">登出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" >
          <el-menu
            router
            default-active="1"
            @open="handleOpen"
            @close="handleClose">
            <el-menu-item index="/stockTask" style="padding-left: 0px">
              <i class="el-icon-setting"></i>
              <span slot="title">股票回测</span>
            </el-menu-item>
            <el-menu-item index="/stockQuery" style="padding-left: 0px">
              <i class="el-icon-search"></i>
              <span slot="title">股票搜索</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import * as axios from "axios";
  const AdminUrl = 'stock_admin/yanbin/admin';
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      logout() {
        console.log("logout");
        axios({
          method: 'get',
          url: `${AdminUrl}/logout`, // 请求地址
        });
        this.$router.push({ path: '/login' });
      }
    }
  }
</script>
<style>
  .el-aside {
    display: block;
    height:100vh;
    overflow-y: scroll;
  }
  .home-header {
    padding: 8px
  }
</style>
