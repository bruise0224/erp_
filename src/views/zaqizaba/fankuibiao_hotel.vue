<template>
    <div>
      <!-- 第一部分：搜索栏与按钮 -->
      <el-row>
        <el-col :span="6">
          <el-date-picker
            v-model="searchMonth"
            type="month"
            placeholder="选择月份"
          ></el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-select v-model="searchCity" placeholder="选择城市">
            <el-option
              v-for="city in cities"
              :label="city"
              :value="city"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="filterData">筛选</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="success" @click="sortByRecentUse">最近使用排序</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="info" @click="sortByMostUse">使用最多排序</el-button>
        </el-col>
      </el-row>
      <el-button >导出</el-button>
      <router-link to="/edit/edit_hotel"><button>返回</button></router-link>
  
      <!-- 第二部分：表格 -->
      <el-table :data="displayTableData" border>
        <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
        <el-table-column prop="city" label="所在城市"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="star" label="星级"></el-table-column>
        <el-table-column prop="useTimes" label="使用次数"></el-table-column>
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
          useTimes: 35
        },
        {
          hotelName: 'Hotel London',
          city: 'London',
          remark: '',
          star: 5,
          useTimes: 50
        },
        {
          hotelName: 'Hotel Rome',
          city: 'Rome',
          remark: '',
          star: 4,
          useTimes: 28
        },
        {
          hotelName: 'Hotel Barcelona',
          city: 'Barcelona',
          remark: '',
          star: 3,
          useTimes: 40
        },
        {
          hotelName: 'Hotel Berlin',
          city: 'Berlin',
          remark: '',
          star: 4,
          useTimes: 32
        },
        {
          hotelName: 'Hotel Vienna',
          city: 'Vienna',
          remark: '',
          star: 4,
          useTimes: 22
        },
        {
          hotelName: 'Hotel Athens',
          city: 'Athens',
          remark: '',
          star: 3,
          useTimes: 30
        },
        {
          hotelName: 'Hotel Amsterdam',
          city: 'Amsterdam',
          remark: '',
          star: 4,
          useTimes: 45
        },
        {
          hotelName: 'Hotel Prague',
          city: 'Prague',
          remark: '',
          star: 3,
          useTimes: 20
        },
        {
          hotelName: 'Hotel Budapest',
          city: 'Budapest',
          remark: '',
          star: 4,
          useTimes: 38
        },
        {
          hotelName: 'Hotel Florence',
          city: 'Florence',
          remark: '',
          star: 4,
          useTimes: 18
        },
        {
          hotelName: 'Hotel Madrid',
          city: 'Madrid',
          remark: '',
          star: 5,
          useTimes: 48
        },
        {
          hotelName: 'Hotel Munich',
          city: 'Munich',
          remark: '',
          star: 4,
          useTimes: 36
        },
        {
          hotelName: 'Hotel Lisbon',
          city: 'Lisbon',
          remark: '',
          star: 3,
          useTimes: 25
        },
        {
          hotelName: 'Hotel Copenhagen',
          city: 'Copenhagen',
          remark: '',
          star: 4,
          useTimes: 26
        },
        {
          hotelName: 'Hotel Stockholm',
          city: 'Stockholm',
          remark: '',
          star: 4,
          useTimes: 33
        },
        {
          hotelName: 'Hotel Dublin',
          city: 'Dublin',
          remark: '',
          star: 3,
          useTimes: 37
        },
        {
          hotelName: 'Hotel Edinburgh',
          city: 'Edinburgh',
          remark: '',
          star: 4,
          useTimes: 24
        },
        {
          hotelName: 'Hotel Venice',
          city: 'Venice',
          remark: '',
          star: 4,
          useTimes: 15
        },
        {
          hotelName: 'Hotel Zurich',
          city: 'Zurich',
          remark: '',
          star: 5,
          useTimes: 55
        }
      ]);
  
      const searchMonth = ref('');
      const searchCity = ref('');
      const displayTableData = ref([...tableData.value]);
  
      const filterData = () => {
        let filtered = [...tableData.value];
        if (searchMonth.value) {
          // 假设这里有对应的日期数据来进行月份筛选，这里只是示例逻辑，实际需完善
          filtered = filtered.filter(item => item.someDateField.includes(searchMonth.value));
        }
        if (searchCity.value) {
          filtered = filtered.filter(item => item.city === searchCity.value);
        }
        displayTableData.value = filtered;
      };
  
      const sortByRecentUse = () => {
        // 假设这里有对应的最近使用时间数据来进行排序，这里只是示例逻辑，实际需完善
        displayTableData.value.sort((a, b) => {
          return a.recentUseTime - b.recentUseTime;
        });
      };
  
      const sortByMostUse = () => {
        displayTableData.value.sort((a, b) => {
          return b.useTimes - a.useTimes;
        });
      };
  
      return {
        cities,
        tableData,
        searchMonth,
        searchCity,
        displayTableData,
        filterData,
        sortByRecentUse,
        sortByMostUse
      };
    }
  };
  </script>
  
  <style scoped>
  </style>