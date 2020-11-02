<template>
  <div style="margin: 20px;">
    <el-header align="left">回测条件: </el-header>
    <el-form :label-position="labelPosition" label-width="150px">
      <el-form-item label="当天">
        <div align="left">
          <el-input type="textarea" style="width: 400px;" placeholder="筛选条件" v-model="request.condition1"/>
        </div>
      </el-form-item>
      <el-form-item label="上一个交易日">
        <div align="left">
          <el-input type="textarea" style="width: 400px;" placeholder="筛选条件" v-model="request.condition2"/>
        </div>
      </el-form-item>
      <el-form-item label="其他">
        <div align="left">
          <el-input type="textarea" style="width: 400px;" placeholder="筛选条件" v-model="request.condition3"/>
        </div>
      </el-form-item>
      <el-form-item label="回测区间">
        <div align="left">
          <el-date-picker
            v-model="request.timeRange"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </el-form-item>
    </el-form>
    <br/>
    <el-header align="left">回测策略: </el-header>
    <el-form :label-position="labelPosition" label-width="150px">
      <el-form-item label="买入">
        <div align="left">
          <el-time-picker
            :editable="false"
            v-model="request.buyRule.time"
            :picker-options="{
              selectableRange: ['09:30:00 - 11:30:00', '13:00:00 - 15:00:00']
            }"
            :align="right">
          </el-time-picker>
          <label>延后天数</label>
          <el-input type='number' style="width: 100px;" placeholder="筛选条件" v-model="request.buyRule.offset"/>
        </div>
      </el-form-item>
      <el-form-item label="卖出">
        <div align="left">
          <el-time-picker
            :editable="false"
            v-model="request.saleRule.time"
            :picker-options="{
              selectableRange: ['09:30:00 - 11:30:00', '13:00:00 - 15:00:00']
            }"
            :align="right">
          </el-time-picker>
          <label>延后天数</label>
          <el-input type='number' style="width: 100px;" placeholder="筛选条件" v-model="request.saleRule.offset"/>
        </div>
      </el-form-item>
    </el-form>
    <el-button type="primary" :loading="loading" @click="onSubmit()">提交</el-button>
    <br><br>
    <router-link to="/stockQuery">股票查询</router-link>
  </div>
</template>

<script>
import axios from 'axios';

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
  name: "StockTask",
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      request: {
        "timeRange": null,
        "condition1": "9点32分时大单净比大于8.8，量比大于3.8，换手率大于0.8%",
        "condition2": "收盘价小于5日线*1.18，涨跌幅小于15%",
        "condition3": "剔除ST，无立案调查，创业板",
        "buyRule": {
          "time": new Date(2020, 10, 31, 9, 32),
          "offset": 0
        },
        "saleRule": {
          "time": new Date(2020, 10, 31, 9, 32),
          "offset": 1
        }
      },
      loading: false
    }
  },
  methods: {
    onSubmit() {
      if (this.request.timeRange == null) {
        console.error(`回测时间不能为空`);
        return
      }
      this.loading = true
      const stockTaskRequest = {
        "queryTemplate": `${DatePlaceHolder}${this.request.condition1}，${LastDatePlaceHolder}${this.request.condition2}，${this.request.condition3}`,
        "startTime": this.request.timeRange[0],
        "endTime": this.request.timeRange[1],
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
      }).finally(() => {
        this.loading = false;
      });
    }
  }
}

</script>
