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
    return false;
  }
}

export {
  checkAuth
};
