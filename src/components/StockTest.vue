<template>
  <div>
    <el-time-picker
      :editable="false"
      v-model="date"
      :picker-options="{
        selectableRange: ['09:30:00 - 11:30:00', '13:00:00 - 15:00:00']
      }"
      :align="right">
    </el-time-picker>
    <el-date-picker></el-date-picker>
  </div>
</template>
<script>
  export default {
    name: "stock-test",
    data() {
      return {
        date: new Date(2016, 9, 10, 9, 32)
      }
    },
    methods: {

    }
  }
</script>


