<template>
    <div>
      <!-- 第一部分：按钮 -->
      <el-button type="primary" @click="handleButtonClick">导出</el-button>
      <router-link to="/zaqizaba/huizongbiao_hotel"><button>返回</button></router-link>
  
      <!-- 第二部分：表格 -->
      <el-table :data="tableData" border>
        <el-table-column prop="groupNumber" label="团号"></el-table-column>
        <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
        <el-table-column prop="checkInDate" label="入住日期"></el-table-column>
        <el-table-column prop="roomType" label="房间类型"></el-table-column>
        <el-table-column prop="stayDays" label="入住天数"></el-table-column>
        <el-table-column prop="roomTotal" label="房间总数"></el-table-column>
        <el-table-column prop="city" label="城市"></el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const tableData = ref([
        {
          groupNumber: 'T001',
          hotelName: 'Hotel Paris',
          checkInDate: '2024-01-01',
          roomType: 'Single Room',
          stayDays: 3,
          roomTotal: 5,
          city: 'Paris'
        },
        {
          groupNumber: 'T002',
          hotelName: 'Hotel London',
          checkInDate: '2024-02-05',
          roomType: 'Double Room',
          stayDays: 4,
          roomTotal: 8,
          city: 'London'
        },
        {
          groupNumber: 'T003',
          hotelName: 'Hotel Rome',
          checkInDate: '2024-03-10',
          roomType: 'Suite',
          stayDays: 5,
          roomTotal: 3,
          city: 'Rome'
        },
        {
          groupNumber: 'T004',
          hotelName: 'Hotel Barcelona',
          checkInDate: '2024-04-15',
          roomType: 'Twin Room',
          stayDays: 6,
          roomTotal: 6,
          city: 'Barcelona'
        },
        {
          groupNumber: 'T005',
          hotelName: 'Hotel Berlin',
          checkInDate: '2024-05-20',
          roomType: 'Single Room',
          stayDays: 2,
          roomTotal: 10,
          city: 'Berlin'
        },
        {
          groupNumber: 'T006',
          hotelName: 'Hotel Vienna',
          checkInDate: '2024-06-25',
          roomType: 'Double Room',
          stayDays: 3,
          roomTotal: 7,
          city: 'Vienna'
        },
        {
          groupNumber: 'T007',
          hotelName: 'Hotel Athens',
          checkInDate: '2024-07-30',
          roomType: 'Suite',
          stayDays: 4,
          roomTotal: 4,
          city: 'Athens'
        },
        {
          groupNumber: 'T008',
          hotelName: 'Hotel Amsterdam',
          checkInDate: '2024-08-05',
          roomType: 'Twin Room',
          stayDays: 5,
          roomTotal: 9,
          city: 'Amsterdam'
        },
        {
          groupNumber: 'T009',
          hotelName: 'Hotel Prague',
          checkInDate: '2024-09-10',
          roomType: 'Single Room',
          stayDays: 6,
          roomTotal: 5,
          city: 'Prague'
        },
        {
          groupNumber: 'T010',
          hotelName: 'Hotel Budapest',
          checkInDate: '2024-10-15',
          roomType: 'Double Room',
          stayDays: 3,
          roomTotal: 8,
          city: 'Budapest'
        },
        {
          groupNumber: 'T011',
          hotelName: 'Hotel Florence',
          checkInDate: '2024-11-20',
          roomType: 'Suite',
          stayDays: 4,
          roomTotal: 3,
          city: 'Florence'
        },
        {
          groupNumber: 'T012',
          hotelName: 'Hotel Madrid',
          checkInDate: '2024-12-25',
          roomType: 'Twin Room',
          stayDays: 5,
          roomTotal: 6,
          city: 'Madrid'
        },
        {
          groupNumber: 'T013',
          hotelName: 'Hotel Munich',
          checkInDate: '2024-01-03',
          roomType: 'Single Room',
          stayDays: 2,
          roomTotal: 7,
          city: 'Munich'
        },
        {
          groupNumber: 'T014',
          hotelName: 'Hotel Lisbon',
          checkInDate: '2024-02-08',
          roomType: 'Double Room',
          stayDays: 3,
          roomTotal: 9,
          city: 'Lisbon'
        },
        {
          groupNumber: 'T015',
          hotelName: 'Hotel Copenhagen',
          checkInDate: '2024-03-13',
          roomType: 'Suite',
          stayDays: 4,
          roomTotal: 4,
          city: 'Copenhagen'
        },
        {
          groupNumber: 'T016',
          hotelName: 'Hotel Stockholm',
          checkInDate: '2024-04-18',
          roomType: 'Twin Room',
          stayDays: 5,
          roomTotal: 10,
          city: 'Stockholm'
        },
        {
          groupNumber: 'T017',
          hotelName: 'Hotel Dublin',
          checkInDate: '2024-05-23',
          roomType: 'Single Room',
          stayDays: 3,
          roomTotal: 11,
          city: 'Dublin'
        },
        {
          groupNumber: 'T018',
          hotelName: 'Hotel Edinburgh',
          checkInDate: '2024-06-28',
          roomType: 'Double Room',
          stayDays: 4,
          roomTotal: 7,
          city: 'Edinburgh'
        },
        {
          groupNumber: 'T019',
          hotelName: 'Hotel Venice',
          checkInDate: '2024-07-03',
          roomType: 'Suite',
          stayDays: 5,
          roomTotal: 3,
          city: 'Venice'
        },
        {
          groupNumber: 'T020',
          hotelName: 'Hotel Zurich',
          checkInDate: '2024-08-08',
          roomType: 'Twin Room',
          stayDays: 6,
          roomTotal: 9,
          city: 'Zurich'
        }
      ]);
  
      const handleButtonClick = () => {
        // 这里可以添加按钮点击后的处理逻辑，目前为空
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