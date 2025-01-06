<template>
    <div>
      <!-- 第一部分：按钮 -->
      <el-button type="primary" @click="buttonClick">导出</el-button>
      <router-link to="/zaqizaba/huizongbiao_hotel"><button>返回</button></router-link>
  
      <!-- 第二部分：表格 -->
      <el-table :data="tableData" border>
        <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
        <el-table-column prop="weeklyCheckInTotal" label="周入住总数"></el-table-column>
        <el-table-column prop="monthlyCheckInTotal" label="月入住总数"></el-table-column>
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
          weeklyCheckInTotal: 45,
          monthlyCheckInTotal: 180
        },
        {
          hotelName: 'Hotel London',
          weeklyCheckInTotal: 50,
          monthlyCheckInTotal: 200
        },
        {
          hotelName: 'Hotel Rome',
          weeklyCheckInTotal: 35,
          monthlyCheckInTotal: 130
        },
        {
          hotelName: 'Hotel Barcelona',
          weeklyCheckInTotal: 40,
          monthlyCheckInTotal: 160
        },
        {
          hotelName: 'Hotel Berlin',
          weeklyCheckInTotal: 48,
          monthlyCheckInTotal: 190
        },
        {
          hotelName: 'Hotel Vienna',
          weeklyCheckInTotal: 30,
          monthlyCheckInTotal: 110
        },
        {
          hotelName: 'Hotel Athens',
          weeklyCheckInTotal: 38,
          monthlyCheckInTotal: 140
        },
        {
          hotelName: 'Hotel Amsterdam',
          weeklyCheckInTotal: 55,
          monthlyCheckInTotal: 220
        },
        {
          hotelName: 'Hotel Prague',
          weeklyCheckInTotal: 28,
          monthlyCheckInTotal: 100
        },
        {
          hotelName: 'Hotel Budapest',
          weeklyCheckInTotal: 42,
          monthlyCheckInTotal: 170
        },
        {
          hotelName: 'Hotel Florence',
          weeklyCheckInTotal: 25,
          monthlyCheckInTotal: 90
        },
        {
          hotelName: 'Hotel Madrid',
          weeklyCheckInTotal: 46,
          monthlyCheckInTotal: 185
        },
        {
          hotelName: 'Hotel Munich',
          weeklyCheckInTotal: 44,
          monthlyCheckInTotal: 175
        },
        {
          hotelName: 'Hotel Lisbon',
          weeklyCheckInTotal: 32,
          monthlyCheckInTotal: 120
        },
        {
          hotelName: 'Hotel Copenhagen',
          weeklyCheckInTotal: 36,
          monthlyCheckInTotal: 135
        },
        {
          hotelName: 'Hotel Stockholm',
          weeklyCheckInTotal: 41,
          monthlyCheckInTotal: 165
        },
        {
          hotelName: 'Hotel Dublin',
          weeklyCheckInTotal: 49,
          monthlyCheckInTotal: 195
        },
        {
          hotelName: 'Hotel Edinburgh',
          weeklyCheckInTotal: 34,
          monthlyCheckInTotal: 130
        },
        {
          hotelName: 'Hotel Venice',
          weeklyCheckInTotal: 22,
          monthlyCheckInTotal: 80
        },
        {
          hotelName: 'Hotel Zurich',
          weeklyCheckInTotal: 52,
          monthlyCheckInTotal: 210
        }
      ]);
  
      const buttonClick = () => {
        // 这里可以添加按钮点击后的处理逻辑，目前只是简单打印
        console.log('按钮被点击了');
      };
  
      return {
        tableData,
        buttonClick
      };
    }
  };
  </script>
  
  <style scoped>
  </style>