<template>
  <div>
    <el-header align="left">回测条件: </el-header>
    <el-form label-width="150px">
      <el-form-item label="当天">
        <div align="left">
          <el-input type="text" class="queryInput" @change="onChange" @keyup.enter.native="handleEnter($event)" :placeholder="constants.conditionDefault1" v-model="request.condition1"/>
        </div>
      </el-form-item>
      <el-form-item label="上一个交易日">
        <div align="left">
          <el-input type="text" class="queryInput" @change="onChange" @keyup.enter.native="handleEnter($event)" :placeholder="constants.conditionDefault2" v-model="request.condition2"/>
        </div>
      </el-form-item>
      <el-form-item label="其他">
        <div align="left">
          <el-input type="text" class="queryInput" @change="onChange" @keyup.enter.native="handleEnter($event)" :placeholder="constants.conditionDefault3" v-model="request.condition3"/>
        </div>
      </el-form-item>
      <el-form-item label="结果">
        <div align="left">
          <el-input type="textarea" :readonly=true class="queryInput2" placeholder="请求试例" v-model="demo"/>
          <el-link href="http://www.iwencai.com/unifiedwap/home/index" type="success" class="tradeLabel">请前往问财验证</el-link>
        </div>
      </el-form-item>
      <el-form-item style="margin-top: 40px" label="回测区间">
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
    <el-form label-width="150px">
      <el-form-item label="买入">
        <div align="left">
          <el-time-picker
            :editable="false"
            v-model="request.buyRule.time"
            :picker-options="{
              selectableRange: ['09:30:00 - 11:30:00', '13:00:00 - 15:00:00']
            }"
            align="right">
          </el-time-picker>
          <label class="tradeLabel">延后天数</label>
          <el-input type='number' class="tradeDay" placeholder="筛选条件" v-model="request.buyRule.offset"/>
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
            align="right">
          </el-time-picker>
          <label class="tradeLabel">延后天数</label>
          <el-input type='number' class="tradeDay" placeholder="筛选条件" v-model="request.saleRule.offset"/>
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

function isEmpty(obj){
  if (typeof obj == "undefined" || obj == null || obj == ""){
    return true;
  } else {
    return false;
  }
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
        }],
        disabledDate: (time) => {
          var startTime = new Date('2020-10-11');
          return time.getTime() < startTime.getTime() || time.getTime() > new Date().getTime();
        }
      },
      request: {
        "timeRange": null,
        "condition1": null,
        "condition2": null,
        "condition3": null,
        "buyRule": {
          "time": new Date(2020, 10, 31, 9, 32),
          "offset": 0
        },
        "saleRule": {
          "time": new Date(2020, 10, 31, 9, 32),
          "offset": 1
        }
      },
      loading: false,
      constants: {
        "conditionDefault1": "9点32分时大单净比大于8.8，量比大于3.8，换手率大于0.8%",
        "conditionDefault2": "收盘价小于5日线*1.18，涨跌幅小于15%",
        "conditionDefault3": "剔除ST，无立案调查，创业板"
      },
      demo: null
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
          const regressionConfig = response.data.data.regressionConfig;
          if (regressionConfig == null) {
            return
          }
          this.request.condition1 = regressionConfig.currentDayRule;
          this.request.condition2 = regressionConfig.lastDayRule;
          this.request.condition3 = regressionConfig.other;
        }
      ).catch(function (error) { // 请求失败处理
        alert(error.message);
      });
    },
    saveTaskConfig() {
      // 获取用户子定义的策略，写入到对应的对象中
      const taskConfig = {
        "regressionConfig": {
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
      if (this.request.timeRange == null) {
        alert('回测时间不能为空');
        return
      }
      // TODO 限制时间跨度，可以在后端限制，同步不同的用户等级，开发不同的测试时间段
      if (this.request.timeRange[1].getTime() - this.request.timeRange[0].getTime() > 3600 * 1000 * 24 * 14) {
        alert('目前回测时间跨度只支持两周，请重新选择')
        return
      }
      var query = this.buildQuery();
      if (isEmpty(query)) {
        alert('回测策略至少有一个不为空');
        return
      }
      this.saveTaskConfig();
      this.getTestResult(query);
    },
    // TODO 如果请求结果返回用户未登录，统一转到登录页面
    getTestResult(query) {
      this.loading = true
      const stockTaskRequest = {
        "queryTemplate": query,
        "startTime": this.request.timeRange[0],
        "endTime": this.request.timeRange[1],
        "buyRule": this.request.buyRule,
        "saleRule": this.request.saleRule
      }
      this.$http.request({
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
        alert(error.message);
      }).finally(() => {
        this.loading = false;
      });
    },
    buildQuery() {
      var query = "";
      if (!isEmpty(this.request.condition1)) {
        query += DatePlaceHolder + this.request.condition1;
      }
      if (!isEmpty(this.request.condition2)) {
        if (!isEmpty(query)) {
          query += "，";
        }
        query += LastDatePlaceHolder + this.request.condition2;
      }
      if (!isEmpty(this.request.condition3)) {
        if (!isEmpty(query)) {
          query += "，";
        }
        query += this.request.condition3;
      }
      return query;
    },
    onChange() {
      // 获取今天的日期和昨天的日期
      var query = "";
      if (!isEmpty(this.request.condition1)) {
        query += this.dealTime(0) + this.request.condition1;
      }
      if (!isEmpty(this.request.condition2)) {
        if (!isEmpty(query)) {
          query += "，";
        }
        query += this.dealTime(1) + this.request.condition2;
      }
      if (!isEmpty(this.request.condition3)) {
        if (!isEmpty(query)) {
          query += "，";
        }
        query += this.request.condition3;
      }
      this.demo = query;
    },
    handleEnter(event){
      event.target.blur();
      this.onChange();
    },
    dealTime(v){
      let b = 24 * 60 * 60 * 1000;
      let day = new Date();

      day.setTime(day.getTime() - v * b);
      let dayMon = day.getMonth() + 1
      let dayDat = day.getDate() + 1

      let s = day.getFullYear() + "年" + dayMon + "月" + dayDat + "日";
      return s;
    }
  }
}

</script>

<style scoped>
  .queryInput {
    width: 800px
  }
  .queryInput2 {
    width: 800px
  }
  .tradeDay {
    width: 100px
  }
  .tradeLabel {
    margin-left: 30px
  }
</style>
