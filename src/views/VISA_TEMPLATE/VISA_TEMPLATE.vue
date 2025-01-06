<template>
    <div class="visa-template">
      <!-- 页面标题 -->
      <h2>自动生成签证申请模板</h2>
  
      <!-- 下拉选择框 -->
      <div>
        <label for="templateSelect">选择签证类型：</label>
        <select v-model="selectedTemplate" id="templateSelect">
          <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
  
      <!-- 模板图片展示区域 -->
      <div class="template-display" v-if="selectedTemplate">
        <h3>模板预览：</h3>
        <img :src="getImagePath(selectedTemplate)" alt="签证模板" />
      </div>
  
      <!-- 操作按钮 -->
      <div class="actions">
        <button @click="generateTemplate">生成模板</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "VisaTemplate",
    data() {
      return {
        // 选项列表
        options: [
          { label: "意大利签证", value: "us" },
          { label: "西班牙签证", value: "jp" },
          { label: "匈牙利签证", value: "schengen" },
          { label: "新西兰签证", value: "uk" },
        ],
        selectedTemplate: "", // 当前选择的模板
      };
    },
    methods: {
      // 返回对应图片的路径
      getImagePath(template) {
        const imageMap = {
          us: require("@/assets/templates/it-visa.jpg"),
          jp: require("@/assets/templates/sp-visa.jpg"),
          schengen: require("@/assets/templates/hu-visa.jpg"),
          uk: require("@/assets/templates/ns-visa.jpg"),
        };
        return imageMap[template] || "";
      },
      // 生成模板按钮点击事件
      generateTemplate() {
        if (this.selectedTemplate) {
          alert(`已选择 ${this.options.find(o => o.value === this.selectedTemplate).label} 模板，正在生成...`);
          // 在这里可以添加进一步的逻辑，比如生成 PDF 或跳转到下载页面
        } else {
          alert("请选择签证类型！");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .visa-template {
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  label {
    font-size: 16px;
    margin-right: 10px;
  }
  
  select {
    padding: 5px;
    font-size: 14px;
  }
  
  .template-display {
    margin-top: 20px;
  }
  
  .template-display img {
    width: 500px;
    border: 1px solid #ddd;
  }
  
  .actions {
    margin-top: 20px;
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>