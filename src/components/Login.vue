<template>
  <div>
    <el-form :model="form">
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
        if (this.form.username === "" || this.form.password === "") {
          alert("用户名或密码为空")
          return
        }
        this.$api.login(this.form.username, this.form.password)
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
    margin-left: 20px;
    height: 60px;
  }
  div.el-input {
    width: 150px;
  }
</style>
