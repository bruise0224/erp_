<template>
    <div>
      <!-- 第一部分：搜索筛选栏 -->
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
          <el-select v-model="searchRegion" placeholder="选择欧洲地区">
            <el-option
              v-for="region in regions"
              :label="region"
              :value="region"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="filterData">筛选</el-button>
        </el-col>
      </el-row>
      <el-button >导出</el-button>
  
      <!-- 第二部分：表格 -->
      <el-table :data="displayTableData" border>
        <el-table-column prop="product" label="产品"></el-table-column>
        <el-table-column prop="groupNumber" label="团号"></el-table-column>
        <el-table-column prop="leader" label="领队"></el-table-column>
        <el-table-column prop="nightNumber" label="晚数"></el-table-column>
        <el-table-column prop="payable" label="应付"></el-table-column>
        <el-table-column prop="receivable" label="应收"></el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import { ref, reactive } from 'vue';
  
  export default {
    setup() {
      const regions = ['东欧', '西欧', '北欧', '南欧'];
      const cities = [
        '巴黎', '伦敦', '罗马', '巴塞罗那', '柏林', '维也纳', '雅典',
        '阿姆斯特丹', '布拉格', '布达佩斯', '佛罗伦萨', '马德里', '慕尼黑',
        '里斯本', '哥本哈根', '斯德哥尔摩', '都柏林', '爱丁堡', '威尼斯', '苏黎世'
      ];
  
      const tableData = ref([
        {
          product: '欧洲文化之旅',
          groupNumber: 'T001',
          leader: '张三',
          nightNumber: 10,
          payable: 5000,
          receivable: 8000,
          city: '巴黎',
          region: '西欧'
        },
        {
          product: '欧洲历史探寻',
          groupNumber: 'T002',
          leader: '李四',
          nightNumber: 12,
          payable: 6000,
          receivable: 9000,
          city: '罗马',
          region: '南欧'
        },
        {
          product: '欧洲艺术鉴赏',
          groupNumber: 'T003',
          leader: '王五',
          nightNumber: 8,
          payable: 4000,
          receivable: 7000,
          city: '维也纳',
          region: '东欧'
        },
        {
          product: '欧洲风情体验',
          groupNumber: 'T004',
          leader: '赵六',
          nightNumber: 9,
          payable: 4500,
          receivable: 7500,
          city: '巴塞罗那',
          region: '南欧'
        },
        {
          product: '欧洲名校参观',
          groupNumber: 'T005',
          leader: '孙七',
          nightNumber: 7,
          payable: 3500,
          receivable: 6000,
          city: '伦敦',
          region: '西欧'
        },
        {
          product: '欧洲建筑赏析',
          groupNumber: 'T006',
          leader: '周八',
          nightNumber: 11,
          payable: 5500,
          receivable: 8500,
          city: '柏林',
          region: '东欧'
        },
        {
          product: '欧洲自然景观之旅',
          groupNumber: 'T007',
          leader: '吴九',
          nightNumber: 13,
          payable: 6500,
          receivable: 9500,
          city: '雅典',
          region: '南欧'
        },
        {
          product: '欧洲美食之旅',
          groupNumber: 'T008',
          leader: '郑十',
          nightNumber: 6,
          payable: 3000,
          receivable: 5000,
          city: '阿姆斯特丹',
          region: '西欧'
        },
        {
          product: '欧洲宗教文化行',
          groupNumber: 'T009',
          leader: '钱十一',
          nightNumber: 10,
          payable: 5000,
          receivable: 8000,
          city: '布拉格',
          region: '东欧'
        },
        {
          product: '欧洲购物狂欢',
          groupNumber: 'T010',
          leader: '陈十二',
          nightNumber: 5,
          payable: 2500,
          receivable: 4000,
          city: '马德里',
          region: '南欧'
        },
        {
          product: '欧洲音乐之旅',
          groupNumber: 'T011',
          leader: '刘十三',
          nightNumber: 9,
          payable: 4500,
          receivable: 7500,
          city: '佛罗伦萨',
          region: '西欧'
        },
        {
          product: '欧洲时尚之旅',
          groupNumber: 'T012',
          leader: '杨十四',
          nightNumber: 8,
          payable: 4000,
          receivable: 7000,
          city: '慕尼黑',
          region: '西欧'
        },
        {
          product: '欧洲海滨度假',
          groupNumber: 'T013',
          leader: '黄十五',
          nightNumber: 12,
          payable: 6000,
          receivable: 9000,
          city: '里斯本',
          region: '南欧'
        },
        {
          product: '欧洲童话之旅',
          groupNumber: 'T014',
          leader: '胡十六',
          nightNumber: 7,
          payable: 3500,
          receivable: 6000,
          city: '哥本哈根',
          region: '北欧'
        },
        {
          product: '欧洲冰雪之旅',
          groupNumber: 'T015',
          leader: '朱十七',
          nightNumber: 14,
          payable: 7000,
          receivable: 10000,
          city: '斯德哥尔摩',
          region: '北欧'
        },
        {
          product: '欧洲文学之旅',
          groupNumber: 'T016',
          leader: '高十八',
          nightNumber: 6,
          payable: 3000,
          receivable: 5000,
          city: '都柏林',
          region: '西欧'
        },
        {
          product: '欧洲古堡探秘',
          groupNumber: 'T017',
          leader: '林十九',
          nightNumber: 10,
          payable: 5000,
          receivable: 8000,
          city: '爱丁堡',
          region: '西欧'
        },
        {
          product: '欧洲运河之旅',
          groupNumber: 'T018',
          leader: '何二十',
          nightNumber: 9,
          payable: 4500,
          receivable: 7500,
          city: '威尼斯',
          region: '南欧'
        },
        {
          product: '欧洲金融中心之旅',
          groupNumber: 'T019',
          leader: '罗二十一',
          nightNumber: 8,
          payable: 4000,
          receivable: 7000,
          city: '苏黎世',
          region: '西欧'
        },
        {
          product: '欧洲葡萄酒之旅',
          groupNumber: 'T020',
          leader: '吕二十二',
          nightNumber: 11,
          payable: 5500,
          receivable: 8500,
          city: '波尔多',
          region: '西欧'
        }
      ]);
  
      const searchMonth = ref('');
      const searchCity = ref('');
      const searchRegion = ref('');
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
        if (searchRegion.value) {
          filtered = filtered.filter(item => item.region === searchRegion.value);
        }
        displayTableData.value = filtered;
      };
  
      return {
        regions,
        cities,
        tableData,
        searchMonth,
        searchCity,
        searchRegion,
        displayTableData,
        filterData
      };
    }
  };
  </script>
  
  <style scoped>
  </style>