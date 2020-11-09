import axios from 'axios';

const AdminUrl = 'stock_admin/yanbin/admin';

async function checkAuth() {
  try {
    var response = await axios({
      method: 'get',
      url: `${AdminUrl}/check`,
    });
    if (response.status !== 200) {
      return false
    }
    return true
  } catch (e) {
    alert("用户未登录")
    return false;
  }
}

export {
  checkAuth
};
