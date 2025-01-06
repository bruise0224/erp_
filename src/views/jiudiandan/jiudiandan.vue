<template>
    <div class="travel-list-container">
      <!-- 第一部分：筛选区域 -->
      <div class="filter-section">
        <label for="regionSelect">地区选择：</label>
        <select id="regionSelect" v-model="selectedRegion">
          <option value="Western Europe">西欧</option>
          <option value="Eastern Europe">东欧</option>
          <option value="Southern Europe">南欧</option>
          <option value="Northern Europe">北欧</option>
        </select>
        <label for="monthSelect">月份选择：</label>
        <select id="monthSelect" v-model="selectedMonth">
          <option value="01">一月</option>
          <option value="02">二月</option>
          <option value="03">三月</option>
          <option value="04">四月</option>
          <option value="05">五月</option>
          <option value="06">六月</option>
          <option value="07">七月</option>
          <option value="08">八月</option>
          <option value="09">九月</option>
          <option value="10">十月</option>
          <option value="11">十一月</option>
          <option value="12">十二月</option>
        </select>
        <label for="citySelect">城市选择：</label>
        <select id="citySelect" v-model="selectedCity">
          <option value="Paris">巴黎</option>
          <option value="London">伦敦</option>
          <option value="Rome">罗马</option>
          <option value="Barcelona">巴塞罗那</option>
          <option value="Berlin">柏林</option>
          <option value="Vienna">维也纳</option>
          <option value="Prague">布拉格</option>
          <option value="Amsterdam">阿姆斯特丹</option>
          <option value="Athens">雅典</option>
          <option value="Dublin">都柏林</option>
        </select>
        <button @click="filterData">筛选</button>
      </div>
  
      <!-- 第二部分：表格区域 -->
      <div class="table-section">
        <h2>HO 25+1 凡品,5.24改金品+ 12twin+3single 意大利全程4星,其他地区3-4星</h2>
        <table>
          <thead>
            <tr>
              <th>城市</th>
              <th>月份</th>
              <th>日期</th>
              <th>酒店</th>
              <th>备注</th>
              <th>每个房间欧元价格</th>
              <th>欧元总金额</th>
              <th>人民币总价格</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filteredTableData1" :key="index">
              <td>{{ item.city }}</td>
              <td>{{ item.month }}</td>
              <td>{{ item.date }}</td>
              <td>
                <select v-model="item.selectedHotel">
                  <option value="Hotel A">Hotel A</option>
                  <option value="Hotel B">Hotel B</option>
                  <option value="Hotel C">Hotel C</option>
                </select>
              </td>
              <td>{{ item.remark }}</td>
              <td>{{ item.roomPrice }}</td>
              <td>{{ item.totalPrice }}</td>
              <td>{{ item.totalPrice * 7.8 }}</td>
            </tr>
          </tbody>
        </table>
        <h2>MU 15+1 7twin+3single 3-4星级酒店 意大利全程升级四星酒店</h2>
        <table>
          <thead>
            <tr>
              <th>城市</th>
              <th>月份</th>
              <th>日期</th>
              <th>酒店</th>
              <th>备注</th>
              <th>每个房间欧元价格</th>
              <th>欧元总金额</th>
              <th>人民币总价格</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filteredTableData2" :key="index">
              <td>{{ item.city }}</td>
              <td>{{ item.month }}</td>
              <td>{{ item.date }}</td>
              <td>
                <select v-model="item.selectedHotel">
                  <option value="Hotel A">Hotel A</option>
                  <option value="Hotel B">Hotel B</option>
                  <option value="Hotel C">Hotel C</option>
                </select>
              </td>
              <td>{{ item.remark }}</td>
              <td>{{ item.roomPrice }}</td>
              <td>{{ item.totalPrice }}</td>
              <td>{{ item.totalPrice * 7.8 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from "vue";
  
  export default {
    setup() {
      // 模拟表格1的原始数据
      const tableData1 = ref([
        {
          city: "Paris",
          month: "01",
          date: "2025-01-01",
          selectedHotel: "Hotel A",
          remark: "",
          roomPrice: 150,
          totalPrice: 150,
        },
        {
          city: "London",
          month: "01",
          date: "2025-01-02",
          selectedHotel: "Hotel B",
          remark: "",
          roomPrice: 180,
          totalPrice: 180,
        },
        {
          city: "Rome",
          month: "01",
          date: "2025-01-03",
          selectedHotel: "Hotel C",
          remark: "",
          roomPrice: 120,
          totalPrice: 120,
        },
        {
          city: "Barcelona",
          month: "01",
          date: "2025-01-04",
          selectedHotel: "Hotel A",
          remark: "",
          roomPrice: 130,
          totalPrice: 130,
        },
        {
          city: "Berlin",
          month: "01",
          date: "2025-01-05",
          selectedHotel: "Hotel B",
          remark: "",
          roomPrice: 160,
          totalPrice: 160,
        },
        {
          city: "Vienna",
          month: "01",
          date: "2025-01-06",
          selectedHotel: "Hotel C",
          remark: "",
          roomPrice: 200,
          totalPrice: 200,
        },
        {
          city: "Prague",
          month: "01",
          date: "2025-01-07",
          selectedHotel: "Hotel A",
          remark: "",
          roomPrice: 110,
          totalPrice: 110,
        },
        {
          city: "Amsterdam",
          month: "01",
          date: "2025-01-08",
          selectedHotel: "Hotel B",
          remark: "",
          roomPrice: 140,
          totalPrice: 140,
        },
        {
          city: "Athens",
          month: "01",
          date: "2025-01-09",
          selectedHotel: "Hotel C",
          remark: "",
          roomPrice: 100,
          totalPrice: 100,
        },
        {
          city: "Dublin",
          month: "01",
          date: "2025-01-10",
          selectedHotel: "Hotel A",
          remark: "",
          roomPrice: 170,
          totalPrice: 170,
        },
      ]);
  
      // 模拟表格2的原始数据
      const tableData2 = ref([
        {
          city: "Paris",
          month: "02",
          date: "2025-02-01",
          selectedHotel: "Hotel A",
          remark: "",
          roomPrice: 160,
          totalPrice: 160,
        },
        {
          city: "London",
          month: "02",
          date: "2025-02-02",
          selectedHotel: "Hotel B",
          remark: "",
          roomPrice: 190,
          totalPrice: 190,
        },
        {
          city: "Rome",
          month: "02",
          date: "2025-02-03",
          selectedHotel: "Hotel C",
          remark: "",
          roomPrice: 130,
          totalPrice: 130,
        },
        {
          city: "Barcelona",
          month: "02",
          date: "2025-02-04",
          selectedHotel: "Hotel A",
          remark: "",
          roomPrice: 140,
          totalPrice: 140,
        },
        {
          city: "Berlin",
          month: "02",
          date: "2025-02-05",
          selectedHotel: "Hotel B",
          remark: "",
          roomPrice: 170,
          totalPrice: 170,
        },
        {
          city: "Vienna",
          month: "02",
          date: "2025-02-06",
          selectedHotel: "Hotel C",
          remark: "",
          roomPrice: 210,
          totalPrice: 210,
        },
        {
          city: "Prague",
          month: "02",
          date: "2025-02-07",
          selectedHotel: "Hotel A",
          remark: "",
          roomPrice: 120,
          totalPrice: 120,
        },
        {
          city: "Amsterdam",
          month: "02",
          date: "2025-02-08",
          selectedHotel: "Hotel B",
          remark: "",
          roomPrice: 150,
          totalPrice: 150,
        },
        {
          city: "Athens",
          month: "02",
          date: "2025-02-09",
          selectedHotel: "Hotel C",
          remark: "",
          roomPrice: 110,
          totalPrice: 110,
        },
        {
          city: "Dublin",
          month: "02",
          date: "2025-02-10",
          selectedHotel: "Hotel A",
          remark: "",
          roomPrice: 180,
          totalPrice: 180,
        },
      ]);
  
      // 选中的地区
      const selectedRegion = ref("");
      // 选中的月份
      const selectedMonth = ref("");
      // 选中的城市
      const selectedCity = ref("");
  
      // 筛选表格1数据的计算属性
      const filteredTableData1 = computed(() => {
        return tableData1.value.filter((item) => {
          if (selectedMonth.value && item.month === selectedMonth.value) {
            if (selectedCity.value && item.city === selectedCity.value) {
              return true;
            } else if (!selectedCity.value) {
              return true;
            }
          } else if (!selectedMonth.value && selectedCity.value && item.city === selectedCity.value) {
            return true;
          } else if (!selectedMonth.value &&!selectedCity.value) {
            return true;
          }
          return false;
        });
      });
  
      // 筛选表格2数据的计算属性
      const filteredTableData2 = computed(() => {
        return tableData2.value.filter((item) => {
          if (selectedMonth.value && item.month === selectedMonth.value) {
            if (selectedCity.value && item.city === selectedCity.value) {
              return true;
            } else if (!selectedCity.value) {
              return true;
            }
          } else if (!selectedMonth.value && selectedCity.value && item.city === selectedCity.value) {
            return true;
          } else if (!selectedMonth.value &&!selectedCity.value) {
            return true;
          }
          return false;
        });
      });
  
      // 筛选数据函数，可按需扩展更多逻辑
      const filterData = () => {
        console.log("执行筛选操作");
      };
  
      return {
        tableData1,
        tableData2,
        selectedRegion,
        selectedMonth,
        selectedCity,
        filteredTableData1,
        filteredTableData2,
        filterData,
      };
    },
  };
  </script>
  
  <style scoped>
  .travel-list-container {
    padding: 20px;
  }
  .filter-section {
    margin-bottom: 20px;
  }
  .filter-section label,
  .filter-section select,
  .filter-section button {
    margin-right: 10px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
  }
  </style>