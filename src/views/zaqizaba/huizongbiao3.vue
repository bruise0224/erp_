<template>
    <div>
      <!-- 第一部分：按钮 -->
      <el-button type="primary" @click="handleButtonClick">导出</el-button>
      <router-link to="/zaqizaba/huizongbiao_hotel"><button>返回</button></router-link>
      <!-- 第二部分：表格 -->
      <el-table :data="tableData" border>
        <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
        <el-table-column prop="annualCheckInTotal" label="年入住总数"></el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const tableData = ref([
        {
          hotelName: 'Hotel Paris',
          annualCheckInTotal: 1200
        },
        {
          hotelName: 'Hotel London',
          annualCheckInTotal: 1500
        },
        {
          hotelName: 'Hotel Rome',
          annualCheckInTotal: 900
        },
        {
          hotelName: 'Hotel Barcelona',
          annualCheckInTotal: 1000
        },
        {
          hotelName: 'Hotel Berlin',
          annualCheckInTotal: 1300
        },
        {
          hotelName: 'Hotel Vienna',
          annualCheckInTotal: 800
        },
        {
          hotelName: 'Hotel Athens',
          annualCheckInTotal: 950
        },
        {
          hotelName: 'Hotel Amsterdam',
          annualCheckInTotal: 1400
        },
        {
          hotelName: 'Hotel Prague',
          annualCheckInTotal: 700
        },
        {
          hotelName: 'Hotel Budapest',
          annualCheckInTotal: 1100
        },
        {
          hotelName: 'Hotel Florence',
          annualCheckInTotal: 600
        },
        {
          hotelName: 'Hotel Madrid',
          annualCheckInTotal: 1350
        },
        {
          hotelName: 'Hotel Munich',
          annualCheckInTotal: 1250
        },
        {
          hotelName: 'Hotel Lisbon',
          annualCheckInTotal: 850
        },
        {
          hotelName: 'Hotel Copenhagen',
          annualCheckInTotal: 750
        },
        {
          hotelName: 'Hotel Stockholm',
          annualCheckInTotal: 1050
        },
        {
          hotelName: 'Hotel Dublin',
          annualCheckInTotal: 1150
        },
        {
          hotelName: 'Hotel Edinburgh',
          annualCheckInTotal: 880
        },
        {
          hotelName: 'Hotel Venice',
          annualCheckInTotal: 550
        },
        {
          hotelName: 'Hotel Zurich',
          annualCheckInTotal: 1450
        }
      ]);
  
      const handleButtonClick = () => {
        // 这里可以添加按钮点击后的具体逻辑，比如弹出提示框等
        console.log('按钮被点击了');
      };
  
      return {
        tableData,
        handleButtonClick
      };
    }
  };
  </script>
  
  <style scoped>
  </style>