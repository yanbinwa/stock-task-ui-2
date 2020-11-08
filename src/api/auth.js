import axios from 'axios';
const AdminUrl = 'stock_admin/yanbin/admin';

function checkAuth() {
  console.log("check user");
  var ret = false;
  axios({
    method: 'get',
    url: `${AdminUrl}/check`,
    async: false
  }).then(
    response => {
      if (response.status === 200) {
        ret = true
      }
    },
  ).catch(function (error) { // 请求失败处理
  });
  return ret;
}

export {
  checkAuth
};
