<template>
  <div>
    <el-col :span="12">
      <el-menu
        router
        default-active="1"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="/stockTask">
          <i class="el-icon-setting"></i>
          <span slot="title">股票回测</span>
        </el-menu-item>
        <el-menu-item index="/stockQuery">
          <i class="el-icon-search"></i>
          <span slot="title">股票搜索</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
