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
        <el-select v-model="searchCategory" placeholder="选择品类">
          <el-option
            v-for="category in categories"
            :label="category"
            :value="category"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-input v-model="searchGroupNumber" placeholder="团号搜索"></el-input>
      </el-col>
      <el-col :span="6">
        <el-select v-model="searchLocation" placeholder="选择地点">
          <el-option
            v-for="location in locations"
            :label="location"
            :value="location"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="filterData">筛选</el-button>
        <el-button type="success" @click="exportData">导出</el-button>
        <el-button type="warning" @click="addDataDialogVisible = true">新增数据</el-button>
      </el-col>
    </el-row>

    <!-- 新增数据对话框 -->
    <el-dialog v-model="addDataDialogVisible" title="新增数据">
      <el-form :model="newData" ref="addDataForm">
        <el-form-item label="日期">
          <el-date-picker
            v-model="newData.date"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="品类">
          <el-select v-model="newData.category" placeholder="选择品类">
            <el-option
              v-for="category in categories"
              :label="category"
              :value="category"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="团号">
          <el-input v-model="newData.groupNumber"></el-input>
        </el-form-item>
        <el-form-item label="checkin时间">
          <el-time-picker
            v-model="newData.checkinTime"
            placeholder="选择入住时间"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="checkout时间">
          <el-time-picker
            v-model="newData.checkoutTime"
            placeholder="选择退房时间"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="房间类型">
          <el-select v-model="newData.roomType" placeholder="选择房间类型">
            <el-option label="单人间" value="单人间"></el-option>
            <el-option label="双人间" value="双人间"></el-option>
            <el-option label="套房" value="套房"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="晚数">
          <el-input v-model="newData.nightNumber" type="number"></el-input>
        </el-form-item>
        <el-form-item label="地点">
          <el-select v-model="newData.location" placeholder="选择地点">
            <el-option
              v-for="location in locations"
              :label="location"
              :value="location"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="酒店">
          <el-input v-model="newData.hotel"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="newData.remark"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDataDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addData">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 第二部分：表格 -->
    <el-table :data="displayTableData" border>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="category" label="品类"></el-table-column>
      <el-table-column prop="groupNumber" label="团号"></el-table-column>
      <el-table-column prop="checkinTime" label="checkin时间"></el-table-column>
      <el-table-column prop="checkoutTime" label="checkout时间"></el-table-column>
      <el-table-column prop="roomType" label="房间类型"></el-table-column>
      <el-table-column prop="nightNumber" label="晚数"></el-table-column>
      <el-table-column prop="location" label="地点"></el-table-column>
      <el-table-column prop="hotel" label="酒店"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="{ row }">
          <el-button type="text" @click="editData(row)">编辑</el-button>
          <el-button type="text" @click="deleteData(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑数据对话框 -->
    <el-dialog v-model="editDataDialogVisible" title="编辑数据">
      <el-form :model="editData" ref="editDataForm">
        <el-form-item label="日期">
          <el-date-picker
            v-model="editData.date"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="品类">
          <el-select v-model="editData.category" placeholder="选择品类">
            <el-option
              v-for="category in categories"
              :label="category"
              :value="category"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="团号">
          <el-input v-model="editData.groupNumber"></el-input>
        </el-form-item>
        <el-form-item label="checkin时间">
          <el-time-picker
            v-model="editData.checkinTime"
            placeholder="选择入住时间"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="checkout时间">
          <el-time-picker
            v-model="editData.checkoutTime"
            placeholder="选择退房时间"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="房间类型">
          <el-select v-model="editData.roomType" placeholder="选择房间类型">
            <el-option label="单人间" value="单人间"></el-option>
            <el-option label="双人间" value="双人间"></el-option>
            <el-option label="套房" value="套房"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="晚数">
          <el-input v-model="editData.nightNumber" type="number"></el-input>
        </el-form-item>
        <el-form-item label="地点">
          <el-select v-model="editData.location" placeholder="选择地点">
            <el-option
              v-for="location in locations"
              :label="location"
              :value="location"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="酒店">
          <el-input v-model="editData.hotel"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="editData.remark"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDataDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveEditData">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
  setup() {
    const categories = ['旅游团', '商务团', '研学团'];
    const locations = ['巴黎', '伦敦', '罗马', '巴塞罗那', '柏林', '维也纳', '雅典', '阿姆斯特丹', '布拉格', '布达佩斯'];

    const tableData = ref([
      {
        date: '2024-01-05',
        category: '旅游团',
        groupNumber: 'T001',
        checkinTime: '14:00',
        checkoutTime: '12:00',
        roomType: '双人间',
        nightNumber: 5,
        location: '巴黎',
        hotel: 'Hotel Paris',
        remark: '无'
      },
      {
        date: '2024-02-10',
        category: '商务团',
        groupNumber: 'T002',
        checkinTime: '15:00',
        checkoutTime: '13:00',
        roomType: '套房',
        nightNumber: 3,
        location: '伦敦',
        hotel: 'Hotel London',
        remark: '重要商务会议团'
      },
      {
        date: '2024-03-15',
        category: '研学团',
        groupNumber: 'T003',
        checkinTime: '16:00',
        checkoutTime: '11:00',
        roomType: '单人间',
        nightNumber: 7,
        location: '罗马',
        hotel: 'Hotel Rome',
        remark: '历史文化研学'
      },
      {
        date: '2024-04-20',
        category: '旅游团',
        groupNumber: 'T004',
        checkinTime: '13:00',
        checkoutTime: '10:00',
        roomType: '双人间',
        nightNumber: 4,
        location: '巴塞罗那',
        hotel: 'Hotel Barcelona',
        remark: '海滨度假旅游'
      },
      {
        date: '2024-05-05',
        category: '商务团',
        groupNumber: 'T005',
        checkinTime: '14:30',
        checkoutTime: '12:30',
        roomType: '套房',
        nightNumber: 6,
        location: '柏林',
        hotel: 'Hotel Berlin',
        remark: '科技行业商务洽谈'
      },
      {
        date: '2024-06-10',
        category: '研学团',
        groupNumber: 'T006',
        checkinTime: '15:30',
        checkoutTime: '11:30',
        roomType: '单人间',
        nightNumber: 5,
        location: '维也纳',
        hotel: 'Hotel Vienna',
        remark: '音乐艺术研学'
      },
      {
        date: '2024-07-15',
        category: '旅游团',
        groupNumber: 'T007',
        checkinTime: '13:30',
        checkoutTime: '10:30',
        roomType: '双人间',
        nightNumber: 8,
        location: '雅典',
        hotel: 'Hotel Athens',
        remark: '古迹游览旅游'
      },
      {
        date: '2024-08-20',
        category: '商务团',
        groupNumber: 'T008',
        checkinTime: '14:00',
        checkoutTime: '12:00',
        roomType: '套房',
        nightNumber: 3,
        location: '阿姆斯特丹',
        hotel: 'Hotel Amsterdam',
        remark: '贸易商务团'
      },
      {
        date: '2024-09-05',
        category: '研学团',
        groupNumber: 'T009',
        checkinTime: '16:00',
        checkoutTime: '11:00',
        roomType: '单人间',
        nightNumber: 7,
        location: '布拉格',
        hotel: 'Hotel Prague',
        remark: '建筑艺术研学'
      },
      {
        date: '2024-10-10',
        category: '旅游团',
        groupNumber: 'T010',
        checkinTime: '13:00',
        checkoutTime: '10:00',
        roomType: '双人间',
        nightNumber: 4,
        location: '布达佩斯',
        hotel: 'Hotel Budapest',
        remark: '多瑙河观光旅游'
      }
    ]);

    const searchMonth = ref('');
    const searchCategory = ref('');
    const searchGroupNumber = ref('');
    const searchLocation = ref('');
    const displayTableData = ref([...tableData.value]);

    const addDataDialogVisible = ref(false);
    const newData = reactive({
      date: '',
      category: '',
      groupNumber: '',
      checkinTime: '',
      checkoutTime: '',
      roomType: '',
      nightNumber: 0,
      location: '',
      hotel: '',
      remark: ''
    });

    const editDataDialogVisible = ref(false);
    const editData = reactive({
      date: '',
      category: '',
      groupNumber: '',
      checkinTime: '',
      checkoutTime: '',
      roomType: '',
      nightNumber: 0,
      location: '',
      hotel: '',
      remark: ''
    });

    const filterData = () => {
      let filtered = [...tableData.value];
      if (searchMonth.value) {
        filtered = filtered.filter(item => item.date.includes(searchMonth.value));
      }
      if (searchCategory.value) {
        filtered = filtered.filter(item => item.category === searchCategory.value);
      }
      if (searchGroupNumber.value) {
        filtered = filtered.filter(item => item.groupNumber.includes(searchGroupNumber.value));
      }
      if (searchLocation.value) {
        filtered = filtered.filter(item => item.location === searchLocation.value);
      }
      displayTableData.value = filtered;
    };

    const exportData = () => {
      // 这里可以添加导出数据的逻辑，例如将数据转换为CSV格式并下载
      console.log('导出数据');
    };

    const addData = () => {
      tableData.value.push({...newData });
      addDataDialogVisible.value = false;
      // 清空新增数据表单
      Object.keys(newData).forEach(key => {
        newData[key] = key === 'nightNumber'? 0 : '';
      });
    };

    const saveEditData = () => {
      const index = tableData.value.findIndex(item => item === editData);
      tableData.value[index] = {...editData };
      editDataDialogVisible.value = false;
    };

    const deleteData = (row) => {
      const index = tableData.value.findIndex(item => item === row);
      tableData.value.splice(index, 1);
    };

    return {
      categories,
      locations,
      tableData,
      searchMonth,
      searchCategory,
      searchGroupNumber,
      searchLocation,
      displayTableData,
      addDataDialogVisible,
      newData,
      editDataDialogVisible,
      editData,
      filterData,
      exportData,
      addData,
      editData,
      saveEditData,
      deleteData
    };
  }
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>