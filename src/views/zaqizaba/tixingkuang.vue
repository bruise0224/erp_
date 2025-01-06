<template>
    <div>
      <el-form :model="formData" ref="form">
        <el-form-item label="酒店名称" prop="hotelName">
          <el-input v-model="formData.hotelName"></el-input>
        </el-form-item>
        <el-form-item label="所在城市" prop="city">
          <el-input v-model="formData.city"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="formData.price"></el-input>
        </el-form-item>
        <el-form-item label="星级" prop="star">
          <el-select v-model="formData.star">
            <el-option value="1">一星级</el-option>
            <el-option value="2">二星级</el-option>
            <el-option value="3">三星级</el-option>
            <el-option value="4">四星级</el-option>
            <el-option value="5">五星级</el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </el-form>
  
      <el-alert
        v-if="showAlert"
        title="警告!信息重复录入"
        :message="alertMessage"
        type="warning"
        center
      ></el-alert>
    </div>
  </template>
  
  <script>
  import { ref, reactive } from 'vue';
  
  export default {
    setup() {
      const formData = reactive({
        hotelName: '',
        city: '',
        price: '',
        star: ''
      });
  
      const form = ref(null);
  
      const showAlert = ref(false);
      const alertMessage = ref('111');
  
      const submitForm = () => {
        // 这里可以添加实际的表单提交逻辑，比如验证等
        // 暂时只是简单触发警告框显示
        showAlert.value = true;
      };
  
      return {
        formData,
        form,
        showAlert,
        alertMessage,
        submitForm
      };
    }
  };
  </script>
  
  <style scoped>
  </style>