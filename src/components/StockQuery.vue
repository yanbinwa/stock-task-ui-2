<template>
  <div class="from_box">
    <el-header align="left">选股条件: </el-header>
    <el-form label-width="150px">
      <el-form-item label="当天">
        <div align="left">
          <el-input type="text" class="queryInput" placeholder="筛选条件" v-model="request.condition1"/>
        </div>
      </el-form-item>
      <el-form-item label="上一个交易日">
        <div align="left">
          <el-input type="text" class="queryInput" placeholder="筛选条件" v-model="request.condition2"/>
        </div>
      </el-form-item>
      <el-form-item label="其他">
        <div align="left">
          <el-input type="text" class="queryInput" placeholder="筛选条件" v-model="request.condition3"/>
        </div>
      </el-form-item>
    </el-form>
    <el-button type="primary" :loading="loading" @click="onSubmit()">提交</el-button>
    <br><br>
  </div>
</template>

<script>
const BaseUrl = 'stock_task/yanbin/stock';
const DatePlaceHolder = '${date}';
const LastDatePlaceHolder = '${lastDate}';
function getRemoteFile(res) {
  if (!res) {
    return null;
  }
  const head = res.headers['content-disposition'];
  const type = res.headers['content-type'];
  const blob = new Blob([res.data], { type });
  let filename = head.split(';')[1].split('=')[1];
  const reg = new RegExp('"', 'g');
  filename = filename.replace(reg, '');
  return ({
    blob, filename,
  });
}
export default {
  name: "StockQuery",
  data () {
    return {
      request: {
        "condition1": "9点32分时大单净比大于8.8，量比大于3.8，换手率大于0.8%",
        "condition2": "收盘价小于5日线*1.18，涨跌幅小于15%",
        "condition3": "剔除ST，无立案调查，创业板",
      },
      loading: false
    }
  },
  created(){
    this.loadTaskConfig();
  },
  methods: {
    loadTaskConfig() {
      // 获取用户子定义的策略，写入到对应的对象中
      this.$http.request({
        method: 'get',
        url: `${BaseUrl}/config`
      }).then(
        response => {
          if (response.data.data == null) {
            return
          }
          const queryConfig = response.data.data.queryConfig;
          if (queryConfig == null) {
            return
          }
          this.request.condition1 = queryConfig.currentDayRule;
          this.request.condition2 = queryConfig.lastDayRule;
          this.request.condition3 = queryConfig.other;
        }
      ).catch(function (error) { // 请求失败处理
        alert(error.message);
      });
    },
    saveTaskConfig() {
      // 获取用户子定义的策略，写入到对应的对象中
      const taskConfig = {
        "queryConfig": {
          "currentDayRule": this.request.condition1,
          "lastDayRule": this.request.condition2,
          "other": this.request.condition3
        }
      }
      this.$http.request({
        method: 'post',
        url: `${BaseUrl}/config`,
        data: taskConfig
      });
    },
    onSubmit() {
      this.saveTaskConfig();
      this.getQueryResult();
    },
    getQueryResult() {
      this.loading = true
      const stockTaskRequest = {
        "queryTemplate": `${DatePlaceHolder}${this.request.condition1}，${LastDatePlaceHolder}${this.request.condition2}，${this.request.condition3}`,
      }
      this.$http.request({
        method: 'post',
        url: `${BaseUrl}/stockQuery`, // 请求地址
        data: stockTaskRequest, // 参数
        responseType: 'blob' // 表明返回服务器返回的数据类型
      }).then(
        response => {
          var remoteFile = getRemoteFile(response);
          if (remoteFile.blob != null && navigator.msSaveBlob) {
            navigator.msSaveBlob(remoteFile.blob, remoteFile.filename);
            return;
          }
          var link = document.createElement('a')
          link.href = window.URL.createObjectURL(remoteFile.blob)
          link.download = remoteFile.filename
          link.click()
          //释放内存
          window.URL.revokeObjectURL(link.href)
        }
      ).catch(function (error) { // 请求失败处理
        console.log(error);
      }).finally(() => {
        this.loading = false;
      });
    }
  }
}

</script>

<style scoped>
  .queryInput {
    width: 800px
  }
</style>
