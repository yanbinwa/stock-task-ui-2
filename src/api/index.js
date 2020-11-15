import http from './http';
import qs from 'qs';
import router from '../router';

const AdminUrl = 'stock_admin/yanbin/admin';

/** 通用 **/

async function checkAuth() {
  try {
    var response = await http.request({
      method: 'get',
      url: `${AdminUrl}/check`,
    });
    if (response.status !== 200) {
      return false
    }
    return true
  } catch (e) {
    return false;
  }
}

function login(username, password) {
  http.request({
    method: 'post',
    url: `${AdminUrl}/login`, // 请求地址
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    data: qs.stringify({'userName': username, 'password': password})
  }).then(
    response => {
      if (response.status === 200) {
        router.push({ path: '/' });
      } else {
        alert("用户名或密码错误，请重新输入")
      }
    }
  );
}

function signIn(username, password) {
  http.request({
    method: 'post',
    url: `${AdminUrl}/signIn`, // 请求地址
    data: {'name': username, 'password': password, 'enable': true}
  }).then(
    response => {
      if (response.status === 200) {
        router.push({ path: '/login' });
      } else {
        alert("用户名或密码错误，请重新输入")
      }
    }
  );
}

export default {
  checkAuth, login, signIn
};

