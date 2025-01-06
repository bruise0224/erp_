<template>
    <div>
      <!-- 第一部分：搜索栏与按钮 -->
      <el-row>
        <el-col :span="8">
          <el-input v-model="searchHotel" placeholder="酒店搜索"></el-input>
        </el-col>
        <el-col :span="8">
          <el-select v-model="searchCity" placeholder="城市搜索">
            <el-option
              v-for="city in cities"
              :label="city"
              :value="city"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="filterData">筛选</el-button>
        </el-col>
      </el-row>
  
      <!-- 第二部分：表格 -->
      <el-table :data="displayTableData" border>
        <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
        <el-table-column prop="city" label="所在城市"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="star" label="星级"></el-table-column>
        <el-table-column prop="monthlyBooking" label="月订房量"></el-table-column>
        <el-table-column prop="annualBooking" label="年订房量"></el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import { ref, reactive } from 'vue';
  
  export default {
    setup() {
      const cities = [
        'Paris', 'London', 'Rome', 'Barcelona', 'Berlin', 'Vienna', 'Athens',
        'Amsterdam', 'Prague', 'Budapest', 'Florence', 'Madrid', 'Munich',
        'Lisbon', 'Copenhagen', 'Stockholm', 'Dublin', 'Edinburgh', 'Venice', 'Zurich'
      ];
  
      const tableData = ref([
        {
          hotelName: 'Hotel Paris',
          city: 'Paris',
          remark: '',
          star: 4,
          monthlyBooking: 120,
          annualBooking: 1500
        },
        {
          hotelName: 'Hotel London',
          city: 'London',
          remark: '',
          star: 5,
          monthlyBooking: 150,
          annualBooking: 1800
        },
        {
          hotelName: 'Hotel Rome',
          city: 'Rome',
          remark: '',
          star: 4,
          monthlyBooking: 100,
          annualBooking: 1300
        },
        {
          hotelName: 'Hotel Barcelona',
          city: 'Barcelona',
          remark: '',
          star: 3,
          monthlyBooking: 90,
          annualBooking: 1100
        },
        {
          hotelName: 'Hotel Berlin',
          city: 'Berlin',
          remark: '',
          star: 4,
          monthlyBooking: 110,
          annualBooking: 1400
        },
        {
          hotelName: 'Hotel Vienna',
          city: 'Vienna',
          remark: '',
          star: 4,
          monthlyBooking: 80,
          annualBooking: 1000
        },
        {
          hotelName: 'Hotel Athens',
          city: 'Athens',
          remark: '',
          star: 3,
          monthlyBooking: 70,
          annualBooking: 900
        },
        {
          hotelName: 'Hotel Amsterdam',
          city: 'Amsterdam',
          remark: '',
          star: 4,
          monthlyBooking: 130,
          annualBooking: 1600
        },
        {
          hotelName: 'Hotel Prague',
          city: 'Prague',
          remark: '',
          star: 3,
          monthlyBooking: 60,
          annualBooking: 800
        },
        {
          hotelName: 'Hotel Budapest',
          city: 'Budapest',
          remark: '',
          star: 4,
          monthlyBooking: 95,
          annualBooking: 1200
        },
        {
          hotelName: 'Hotel Florence',
          city: 'Florence',
          remark: '',
          star: 4,
          monthlyBooking: 75,
          annualBooking: 1050
        },
        {
          hotelName: 'Hotel Madrid',
          city: 'Madrid',
          remark: '',
          star: 5,
          monthlyBooking: 140,
          annualBooking: 1700
        },
        {
          hotelName: 'Hotel Munich',
          city: 'Munich',
          remark: '',
          star: 4,
          monthlyBooking: 105,
          annualBooking: 1350
        },
        {
          hotelName: 'Hotel Lisbon',
          city: 'Lisbon',
          remark: '',
          star: 3,
          monthlyBooking: 85,
          annualBooking: 1150
        },
        {
          hotelName: 'Hotel Copenhagen',
          city: 'Copenhagen',
          remark: '',
          star: 4,
          monthlyBooking: 70,
          annualBooking: 950
        },
        {
          hotelName: 'Hotel Stockholm',
          city: 'Stockholm',
          remark: '',
          star: 4,
          monthlyBooking: 90,
          annualBooking: 1200
        },
        {
          hotelName: 'Hotel Dublin',
          city: 'Dublin',
          remark: '',
          star: 3,
          monthlyBooking: 80,
          annualBooking: 1100
        },
        {
          hotelName: 'Hotel Edinburgh',
          city: 'Edinburgh',
          remark: '',
          star: 4,
          monthlyBooking: 65,
          annualBooking: 900
        },
        {
          hotelName: 'Hotel Venice',
          city: 'Venice',
          remark: '',
          star: 4,
          monthlyBooking: 70,
          annualBooking: 1000
        },
        {
          hotelName: 'Hotel Zurich',
          city: 'Zurich',
          remark: '',
          star: 5,
          monthlyBooking: 135,
          annualBooking: 1650
        }
      ]);
  
      const searchHotel = ref('');
      const searchCity = ref('');
      const displayTableData = ref([...tableData.value]);
  
      const filterData = () => {
        let filtered = [...tableData.value];
        if (searchHotel.value) {
          filtered = filtered.filter(item => item.hotelName.includes(searchHotel.value));
        }
        if (searchCity.value) {
          filtered = filtered.filter(item => item.city === searchCity.value);
        }
        displayTableData.value = filtered;
      };
  
      return {
        cities,
        tableData,
        searchHotel,
        searchCity,
        displayTableData,
        filterData
      };
    }
  };
  </script>
  
  <style scoped>
  </style>