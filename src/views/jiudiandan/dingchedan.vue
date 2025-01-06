<template>
    <div>
      <h2>旅行清单</h2>
      <div>
        <label for="regionSelect">地区选择:</label>
        <select id="regionSelect" v-model="selectedRegion">
          <option value="Europe">欧洲</option>
        </select>
      </div>
      <div>
        <label for="monthSelect">月份选择:</label>
        <select id="monthSelect" v-model="selectedMonth">
          <option value="January">一月</option>
          <option value="February">二月</option>
          <option value="March">三月</option>
          <option value="April">四月</option>
          <option value="May">五月</option>
          <option value="June">六月</option>
          <option value="July">七月</option>
          <option value="August">八月</option>
          <option value="September">九月</option>
          <option value="October">十月</option>
          <option value="November">十一月</option>
          <option value="December">十二月</option>
        </select>
      </div>
      <div>
        <label for="citySelect">城市选择:</label>
        <select id="citySelect" v-model="selectedCity">
          <option value="Paris">巴黎</option>
          <option value="London">伦敦</option>
          <option value="Rome">罗马</option>
          <option value="Berlin">柏林</option>
          <option value="Madrid">马德里</option>
        </select>
      </div>
      <div>
        <h3>表格 1</h3>
        <table>
          <thead>
            <tr>
              <th>城市</th>
              <th>日期</th>
              <th>酒店</th>
              <th>备注</th>
              <th>每个房间价格</th>
              <th>人民币总金额</th>
              <th>欧元总金额</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in table1Data" :key="index">
              <td>{{ item.city }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.hotel }}</td>
              <td>{{ item.notes }}</td>
              <td>{{ item.roomPrice }}</td>
              <td>{{ item.totalCNY }}</td>
              <td>{{ item.totalEUR }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h3>表格 2</h3>
        <table>
          <thead>
            <tr>
              <th>城市</th>
              <th>日期</th>
              <th>酒店</th>
              <th>备注</th>
              <th>每个房间价格</th>
              <th>人民币总金额</th>
              <th>欧元总金额</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in table2Data" :key="index">
              <td>{{ item.city }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.hotel }}</td>
              <td>{{ item.notes }}</td>
              <td>{{ item.roomPrice }}</td>
              <td>{{ item.totalCNY }}</td>
              <td>{{ item.totalEUR }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h3>表格 3</h3>
        <table>
          <thead>
            <tr>
              <th>城市</th>
              <th>日期</th>
              <th>酒店</th>
              <th>备注</th>
              <th>每个房间价格</th>
              <th>人民币总金额</th>
              <th>欧元总金额</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in table3Data" :key="index">
              <td>{{ item.city }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.hotel }}</td>
              <td>{{ item.notes }}</td>
              <td>{{ item.roomPrice }}</td>
              <td>{{ item.totalCNY }}</td>
              <td>{{ item.totalEUR }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  export default {
    name: 'TravelList',
    setup() {
      const selectedRegion = ref('Europe');
      const selectedMonth = ref('January');
      const selectedCity = ref('Paris');
  
      const table1Data = ref([
        {
          city: 'Paris',
          date: '2024-01-01',
          hotel: 'Hotel Paris',
          notes: 'Beautiful city',
          roomPrice: 100,
          totalCNY: 750,
          totalEUR: 100
        },
        {
          city: 'Paris',
          date: '2024-01-02',
          hotel: 'Hotel Louvre',
          notes: 'Near Louvre Museum',
          roomPrice: 120,
          totalCNY: 900,
          totalEUR: 120
        }
      ]);
  
      const table2Data = ref([
        {
          city: 'London',
          date: '2024-02-01',
          hotel: 'Hotel London',
          notes: 'Big Ben nearby',
          roomPrice: 150,
          totalCNY: 1125,
          totalEUR: 150
        },
        {
          city: 'London',
          date: '2024-02-02',
          hotel: 'Hotel Tower',
          notes: 'Near Tower Bridge',
          roomPrice: 180,
          totalCNY: 1350,
          totalEUR: 180
        }
      ]);
  
      const table3Data = ref([
        {
          city: 'Rome',
          date: '2024-03-01',
          hotel: 'Hotel Rome',
          notes: 'Colosseum nearby',
          roomPrice: 80,
          totalCNY: 600,
          totalEUR: 80
        },
        {
          city: 'Rome',
          date: '2024-03-02',
          hotel: 'Hotel Vatican',
          notes: 'Near Vatican City',
          roomPrice: 90,
          totalCNY: 675,
          totalEUR: 90
        }
      ]);
  
      return {
        selectedRegion,
        selectedMonth,
        selectedCity,
        table1Data,
        table2Data,
        table3Data
      };
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  table, th, td {
    border: 1px solid black;
  }
  th, td {
    padding: 8px;
    text-align: left;
  }
  </style>