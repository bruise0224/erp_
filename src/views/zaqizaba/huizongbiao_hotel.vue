<template>
    <div>
      <!-- 第一部分：搜索栏 -->
      <el-row class="search-bar">
        <el-col :span="8">
          <el-select v-model="city" placeholder="城市选择">
            <el-option
              v-for="item in cityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="month"
            type="month"
            placeholder="月份选择"
          ></el-date-picker>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="queryData">查询</el-button>
        </el-col>
        <router-link to="/zaqizaba/huizongbiao1"><button>汇总表1导出</button></router-link>
        <router-link to="/zaqizaba/huizongbiao2"><button>汇总表2导出</button></router-link>
        <router-link to="/zaqizaba/huizongbiao3"><button>汇总表3导出</button></router-link>
      </el-row>
  
      <!-- 第二部分：表格 -->
      <el-table :data="tableData" border>
        <el-table-column prop="groupNumber" label="团号"></el-table-column>
        <el-table-column prop="star" label="星级"></el-table-column>
        <el-table-column prop="roomNumber" label="房间数"></el-table-column>
        <el-table-column prop="cityName" label="城市名字"></el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      // 城市选择数据
      const cityOptions = [
        {
          label: '柏林',
          value: 'beijing'
        },
        {
          label: '巴黎',
          value: 'shanghai'
        },
        {
          label: '伦敦',
          value: 'guangzhou'
        },
        {
          label: '马德里',
          value: 'shenzhen'
        }
      ];
  
      const city = ref('');
      const month = ref('');
  
      // 表格数据
      const tableData = ref([
        {
          groupNumber: 'T001',
          star: 4,
          roomNumber: 10,
          cityName: '柏林'
        },
        {
          groupNumber: 'T002',
          star: 5,
          roomNumber: 5,
          cityName: '巴黎'
        },
        {
          groupNumber: 'T003',
          star: 3,
          roomNumber: 15,
          cityName: '伦敦'
        },
        {
          groupNumber: 'T004',
          star: 4,
          roomNumber: 8,
          cityName: '马德里'
        }
      ]);
  
      const queryData = () => {
        // 这里可以添加查询逻辑，根据城市和月份筛选表格数据
        // 目前只是简单示例，未做实际筛选操作
        console.log('查询', city.value, month.value);
      };
  
      return {
        cityOptions,
        city,
        month,
        tableData,
        queryData
      };
    }
  };
  </script>
  
  <style scoped>
  .search-bar {
    margin-bottom: 10px;
  }
  </style>