<template>
    <div>
      <el-upload
        class="upload-demo"
        drag
        :action="uploadUrl"
        :on-change="handleUploadChange"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        :auto-upload="false"
        :show-file-list="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将发票文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-button
        v-if="hasFile"
        type="danger"
        @click="resetUpload"
      >重置上传</el-button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const uploadUrl = 'your_upload_api_url'; // 替换为实际的上传接口地址
      const hasFile = ref(false);
  
      const handleUploadChange = (file) => {
        hasFile.value = true;
        console.log('文件已选择', file);
      };
  
      const handleUploadSuccess = (response) => {
        console.log('文件上传成功', response);
        // 可以在这里添加上传成功后的提示或其他逻辑
      };
  
      const handleUploadError = (error) => {
        console.log('文件上传失败', error);
        // 可以在这里添加上传失败后的提示或其他逻辑
      };
  
      const resetUpload = () => {
        hasFile.value = false;
      };
  
      return {
        uploadUrl,
        hasFile,
        handleUploadChange,
        handleUploadSuccess,
        handleUploadError,
        resetUpload
      };
    }
  };
  </script>
  
  <style scoped>
  .upload-demo.el-upload {
    border: 2px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .upload-demo.el-upload:hover {
    border-color: #409EFF;
  }
  .upload-demo.el-upload__text {
    color: #666;
    font-size: 14px;
    text-align: center;
    padding: 20px 0;
  }
  .upload-demo.el-upload__text em {
    font-style: normal;
    color: #409EFF;
    cursor: pointer;
  }
  </style>