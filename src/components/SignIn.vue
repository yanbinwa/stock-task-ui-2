<template>
  <div>
    <el-form :label-position="labelPosition" :model="form">
      <h3>欢迎注册</h3>
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
        <el-button type="primary" style="margin-left: 60px" @click="onSubmit()">注册</el-button>
        <router-link to="/login" style="margin-left: 10px">登录</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios';
  const AdminUrl = 'stock_admin/yanbin/admin';

  export default {
    name: "SignIn",
    data() {
      return {
        form: {
          username: "",
          password: "",
        },
        icon: "el-input__icon el-icon-view",
        passwordType: "password"
      }
    },
    methods: {
      onSubmit() {
        if (this.form.username === "" || this.form.password === "") {
          alert("用户名或密码为空")
          return
        }
        axios({
          method: 'post',
          url: `${AdminUrl}/signIn`, // 请求地址
          data: {'name': this.form.username, 'password': this.form.password, 'enable': true}
        }).then(
          _ => {
            this.$router.push({ path: '/login' });
          }
        ).catch(function (error) { // 请求失败处理
          alert("用户名已存在")
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
    width: 150px;
    margin-left: 20px;
    height: 60px;
  }
</style>
