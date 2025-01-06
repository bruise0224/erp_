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
        <el-select v-model="searchLeader" placeholder="选择领队">
          <el-option
            v-for="leader in leaders"
            :label="leader"
            :value="leader"
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
        <el-form-item label="月份">
          <el-date-picker
            v-model="newData.month"
            type="month"
            placeholder="选择月份"
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
        <el-form-item label="领队">
          <el-select v-model="newData.leader" placeholder="选择领队">
            <el-option
              v-for="leader in leaders"
              :label="leader"
              :value="leader"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="晚数">
          <el-input v-model="newData.nightNumber" type="number"></el-input>
        </el-form-item>
        <el-form-item label="人数">
          <el-input v-model="newData.personNumber" type="number"></el-input>
        </el-form-item>
        <el-form-item label="成本">
          <el-input v-model="newData.cost" type="number"></el-input>
        </el-form-item>
        <el-form-item label="应收">
          <el-input v-model="newData.receivable" type="number"></el-input>
        </el-form-item>
        <el-form-item label="利润">
          <el-input v-model="newData.profit" type="number"></el-input>
        </el-form-item>
        <el-form-item label="平均每人每晚">
          <el-input v-model="newData.averagePerPersonPerNight" type="number"></el-input>
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
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="month" label="月份"></el-table-column>
      <el-table-column prop="category" label="品类"></el-table-column>
      <el-table-column prop="groupNumber" label="团号"></el-table-column>
      <el-table-column prop="leader" label="领队"></el-table-column>
      <el-table-column prop="nightNumber" label="晚数"></el-table-column>
      <el-table-column prop="personNumber" label="人数"></el-table-column>
      <el-table-column prop="cost" label="成本"></el-table-column>
      <el-table-column prop="receivable" label="应收"></el-table-column>
      <el-table-column prop="profit" label="利润"></el-table-column>
      <el-table-column prop="averagePerPersonPerNight" label="平均每人每晚"></el-table-column>
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
        <el-form-item label="月份">
          <el-date-picker
            v-model="editData.month"
            type="month"
            placeholder="选择月份"
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
        <el-form-item label="领队">
          <el-select v-model="editData.leader" placeholder="选择领队">
            <el-option
              v-for="leader in leaders"
              :label="leader"
              :value="leader"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="晚数">
          <el-input v-model="editData.nightNumber" type="number"></el-input>
        </el-form-item>
        <el-form-item label="人数">
          <el-input v-model="editData.personNumber" type="number"></el-input>
        </el-form-item>
        <el-form-item label="成本">
          <el-input v-model="editData.cost" type="number"></el-input>
        </el-form-item>
        <el-form-item label="应收">
          <el-input v-model="editData.receivable" type="number"></el-input>
        </el-form-item>
        <el-form-item label="利润">
          <el-input v-model="editData.profit" type="number"></el-input>
        </el-form-item>
        <el-form-item label="平均每人每晚">
          <el-input v-model="editData.averagePerPersonPerNight" type="number"></el-input>
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
    const categories = ['欧洲游', '亚洲游', '国内游', '周边游'];
    const leaders = ['张三', '李四', '王五', '赵六'];

    const tableData = ref([
      {
        month: '2024-01',
        category: '欧洲游',
        groupNumber: 'T001',
        leader: '张三',
        nightNumber: 5,
        personNumber: 20,
        cost: 50000,
        receivable: 80000,
        profit: 30000,
        averagePerPersonPerNight: 800,
        remark: '无'
      },
      {
        month: '2024-02',
        category: '亚洲游',
        groupNumber: 'T002',
        leader: '李四',
        nightNumber: 6,
        personNumber: 15,
        cost: 40000,
        receivable: 65000,
        profit: 25000,
        averagePerPersonPerNight: 722.22,
        remark: '无'
      },
      {
        month: '2024-03',
        category: '国内游',
        groupNumber: 'T003',
        leader: '王五',
        nightNumber: 4,
        personNumber: 30,
        cost: 30000,
        receivable: 50000,
        profit: 20000,
        averagePerPersonPerNight: 416.67,
        remark: '无'
      },
      {
        month: '2024-04',
        category: '周边游',
        groupNumber: 'T004',
        leader: '赵六',
        nightNumber: 3,
        personNumber: 25,
        cost: 20000,
        receivable: 35000,
        profit: 15000,
        averagePerPersonPerNight: 466.67,
        remark: '无'
      },
      {
        month: '2024-05',
        category: '欧洲游',
        groupNumber: 'T005',
        leader: '张三',
        nightNumber: 7,
        personNumber: 18,
        cost: 60000,
        receivable: 95000,
        profit: 35000,
        averagePerPersonPerNight: 873.02,
        remark: '无'
      },
      {
        month: '2024-06',
        category: '亚洲游',
        groupNumber: 'T006',
        leader: '李四',
        nightNumber: 5,
        personNumber: 22,
        cost: 45000,
        receivable: 70000,
        profit: 25000,
        averagePerPersonPerNight: 636.36,
        remark: '无'
      },
      {
        month: '2024-07',
        category: '国内游',
        groupNumber: 'T007',
        leader: '王五',
        nightNumber: 6,
        personNumber: 28,
        cost: 35000,
        receivable: 60000,
        profit: 25000,
        averagePerPersonPerNight: 357.14,
        remark: '无'
      },
      {
        month: '2024-08',
        category: '周边游',
        groupNumber: 'T008',
        leader: '赵六',
        nightNumber: 4,
        personNumber: 20,
        cost: 25000,
        receivable: 40000,
        profit: 15000,
        averagePerPersonPerNight: 500,
        remark: '无'
      },
      {
        month: '2024-09',
        category: '欧洲游',
        groupNumber: 'T009',
        leader: '张三',
        nightNumber: 8,
        personNumber: 16,
        cost: 65000,
        receivable: 100000,
        profit: 35000,
        averagePerPersonPerNight: 859.38,
        remark: '无'
      },
      {
        month: '2024-10',
        category: '亚洲游',
        groupNumber: 'T010',
        leader: '李四',
        nightNumber: 7,
        personNumber: 25,
        cost: 50000,
        receivable: 80000,
        profit: 30000,
        averagePerPersonPerNight: 457.14,
        remark: '无'
      }
    ]);

    const searchMonth = ref('');
    const searchCategory = ref('');
    const searchGroupNumber = ref('');
    const searchLeader = ref('');
    const displayTableData = ref([...tableData.value]);

    const addDataDialogVisible = ref(false);
    const newData = reactive({
      month: '',
      category: '',
      groupNumber: '',
      leader: '',
      nightNumber: 0,
      personNumber: 0,
      cost: 0,
      receivable: 0,
      profit: 0,
      averagePerPersonPerNight: 0,
      remark: ''
    });

    const editDataDialogVisible = ref(false);
    const editData = reactive({
      month: '',
      category: '',
      groupNumber: '',
      leader: '',
      nightNumber: 0,
      personNumber: 0,
      cost: 0,
      receivable: 0,
      profit: 0,
      averagePerPersonPerNight: 0,
      remark: ''
    });

    const filterData = () => {
      let filtered = [...tableData.value];
      if (searchMonth.value) {
        filtered = filtered.filter(item => item.month === searchMonth.value);
      }
      if (searchCategory.value) {
        filtered = filtered.filter(item => item.category === searchCategory.value);
      }
      if (searchGroupNumber.value) {
        filtered = filtered.filter(item => item.groupNumber.includes(searchGroupNumber.value));
      }
      if (searchLeader.value) {
        filtered = filtered.filter(item => item.leader === searchLeader.value);
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
        newData[key] = key === 'nightNumber' || key === 'personNumber' || key === 'cost' || key === 'receivable' || key === 'profit' || key === 'averagePerPersonPerNight'? 0 : '';
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
      leaders,
      tableData,
      searchMonth,
      searchCategory,
      searchGroupNumber,
      searchLeader,
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