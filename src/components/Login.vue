<template>
  <div>
    <el-form :model="form">
      <h3>欢迎登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="text" placeholder="请输入密码" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">登录</el-button>
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
        }
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
      }
    }
  }
</script>
