<template>
  <div class="from_box">
    <form action="">
      <label >选股策略</label>
      <input type="text"  placeholder="请输入选股策略" v-model="request.template">
      <label >执行时间</label>
      <input type="text" placeholder="请输入执行时间" v-model="request.time">
      <br><br>
      <label >起始时间</label>
      <input type="text" placeholder="回测起始时间" v-model="request.startTime">
      <label >终止时间</label>
      <input type="text" placeholder="回测终止时间" v-model="request.endTime">
      <br><br>
      <label >买入时间</label>
      <input type="text" placeholder="买入时间" v-model="request.buyRule.time">
      <label >买入延后天数</label>
      <input type="text" placeholder="买入延后天数" v-model="request.buyRule.offset">
      <br><br>
      <label >卖出时间</label>
      <input type="text" placeholder="卖出时间" v-model="request.saleRule.time">
      <label >卖出延后天数</label>
      <input type="text" placeholder="卖出延后天数" v-model="request.saleRule.offset">
      <br><br>
    </form>
    <button @click="onSubmit()">提交</button>
  </div>
</template>

<script>
import axios from 'axios';
const BaseUrl = 'stock_task/yanbin/stock';
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
  name: "StockTask",
  data () {
    return {
      request: {
        "template": "${query}时，大单净比大于8.8，量比大于3.8，剔除ST，无立案调查，创业板，上一个交易日收盘价小于5日线*1.18，9点32分时换手率大于0.8%，昨日涨跌幅小于15%",
        "time": "9点32分",
        "startTime": "2020年9月21日",
        "endTime": "2020年9月25日",
        "buyRule": {
          "time": "9点32分",
          "offset": 0
        },
        "saleRule": {
          "time": "9点32分",
          "offset": 1
        }
      }
    }
  },
  methods: {
    onSubmit() {
      const stockTaskRequest = {
        "queryTemplate": this.request.template,
        "queryTimes": [this.request.time],
        "startTime": this.request.startTime,
        "endTime": this.request.endTime,
        "buyRule": this.request.buyRule,
        "saleRule": this.request.saleRule
      }
      axios({
        method: 'post',
        url: `${BaseUrl}/regressionTest`, // 请求地址
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
      });
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
