<template>
  <div>
    <el-form :label-position="labelPosition" :model="form">
      <h3>欢迎登录</h3>
      <br/>
      <div align="middle">
        <label>账号</label>
        <el-input type="text" class="loginInput" placeholder="请输入账号" v-model="form.username"></el-input>
      </div>
      <div align="middle">
        <label>密码</label>
        <el-input :type="passwordType" class="loginInput" placeholder="请输入密码" v-model="form.password">
          <i slot="suffix" :class="icon" style="margin-top: -8px" @click="showPassword"></i>
        </el-input>
      </div>
      <br/>
      <el-form-item>
        <el-button type="primary" style="margin-left: 60px" @click="onSubmit()">登录</el-button>
        <router-link to="/signIn" style="margin-left: 10px">注册</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs';
  const AdminUrl = 'stock_admin/yanbin/admin';

  export default {
    name: "Login",
    data() {
      return {
        form: {
          username: "",
          password: ""
        },
        icon: "el-input__icon el-icon-view",
        passwordType: "password"
      }
    },
    methods: {
      onSubmit() {
        axios({
          method: 'post',
          url: `${AdminUrl}/login`, // 请求地址
          headers: {'content-type': 'application/x-www-form-urlencoded'},
          data: qs.stringify({'userName': this.form.username, 'password': this.form.password})
        }).then(
          response => {
            if (response.status === 200) {
              this.$router.push({ path: '/' });
            } else {
              // TODO 需要调通
              alert("用户名或密码错误，请重新输入")
            }
          }
        ).catch(function (error) { // 请求失败处理
          console.log(error);
        });
      },
      showPassword() {
        if (this.passwordType=="text") {
          this.passwordType="password";
          this.icon="el-input__icon el-icon-view";
        } else {
          this.passwordType="text";
          this.icon="el-input__icon el-icon-more-outline";
        }
      }
    }
  }
</script>

<style>
  .loginInput {
    width: 200px
  }
</style>
