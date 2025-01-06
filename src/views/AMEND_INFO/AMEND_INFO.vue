<template>
    <div>
      <!-- 标题 -->
      <h2>用户信息表</h2>
  
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <!-- ID 列 -->
        <el-table-column prop="id" label="ID" width="100" />
  
        <!-- 姓名列（可编辑） -->
        <el-table-column prop="name" label="姓名" width="150">
          <template #default="scope">
            <el-input v-model="scope.row.name" placeholder="请输入姓名" />
          </template>
        </el-table-column>
  
        <!-- 地址列（可编辑） -->
        <el-table-column prop="address" label="地址">
          <template #default="scope">
            <el-input v-model="scope.row.address" placeholder="请输入地址" />
          </template>
        </el-table-column>
        <!-- 备注列（新增） -->
        <el-table-column prop="remark" label="备注">
          <template #default="scope">
            <el-input v-model="scope.row.remark" placeholder="请输入备注" />
          </template>
        </el-table-column>
      </el-table>
  
      <!-- 提交按钮 -->
      <div style="margin-top: 20px; text-align: right">
        <el-button type="primary" @click="submitData">提交修改</el-button>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    setup() {
      // 定义数据，包括新增的 remark 字段
      const tableData = ref([
      { id: 1, name: '张三', address: '北京市', remark: '' },
      { id: 2, name: '李四', address: '上海市', remark: '' },
      { id: 3, name: '王五', address: '广州市', remark: '' },
      { id: 4, name: '赵六', address: '深圳市', remark: '' },
    ])
    // 提交数据的方法
    const submitData = () => {
      console.log('提交的数据：', tableData.value)
      // 这里可以添加调用后端 API 的逻辑，将 tableData.value 发送到服务器
      alert('数据已提交，请查看控制台！')
    }
    return { tableData, submitData }
  }
})
</script>
<style scoped>
h2 {
  margin-bottom: 20px;
  text-align: left;
}
</style>