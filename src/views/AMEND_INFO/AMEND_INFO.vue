<template>
  <div class="container-part">
    <!-- 表单部分 -->
    <el-form id="form1" class="form-part" :inline="true" :model="formData1">
      <el-form-item label="月份" label-width="70">
        <el-cascader id="ddl_1e__month" v-model="ddl_1e__month" :options="ddlOptions2" clearable />
      </el-form-item>
      <el-form-item label="地区" label-width="70">
        <el-cascader id="ddl_1e__district" v-model="ddl_1e__district" :options="ddlOptions" placeholder="欧洲团" clearable />
      </el-form-item>
      <el-form-item label="团号" label-width="70">
        <el-input id="tbx_1e__number" v-model="formData1.tbx_1e__number" placeholder="模糊查询" maxlength="20" clearable />
      </el-form-item>

      <!-- 按钮 -->
      <el-form-item>
        <el-button id="btn_SearchID1" type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button id="btn_SearchID01" type="primary" @click="onSubmit">打印</el-button>
      </el-form-item>
      <el-form-item>
        <el-button id="btn_SearchID02" type="primary" @click="onSubmit">导出到EXCEL</el-button>
      </el-form-item>
      <el-form-item>
        <el-button id="btn_SubmitChanges" type="success" @click="handleSubmitChanges">提交修改</el-button>
      </el-form-item>
    </el-form>

    <!-- 动态表格 -->
    <el-table id="table1" class="table-part" :data="tableData1" border>
      <template v-for="col in colOptions">
        <!-- 如果是备注列，允许编辑 -->
        <template v-if="col.prop === 'remark'">
          <el-table-column :label="col.label" :width="col.width">
            <template #default="{ row }">
              <el-input v-model="row.remark" size="small" placeholder="请输入备注" />
            </template>
          </el-table-column>
        </template>

        <!-- 如果是送签日期列，允许编辑 -->
        <template v-else-if="col.prop === 'submission_date'">
          <el-table-column :label="col.label" :width="col.width">
            <template #default="{ row }">
              <el-date-picker v-model="row.submission_date" type="date" placeholder="选择日期" size="small" />
            </template>
          </el-table-column>
        </template>

        <!-- 如果是送签国列，允许编辑 -->
        <template v-else-if="col.prop === 'submission_nation'">
          <el-table-column :label="col.label" :width="col.width">
            <template #default="{ row }">
              <el-input v-model="row.submission_nation" size="small" placeholder="输入送签国" />
            </template>
          </el-table-column>
        </template>

        <!-- 如果是送签员列，允许编辑 -->
        <template v-else-if="col.prop === 'submission_people'">
          <el-table-column :label="col.label" :width="col.width">
            <template #default="{ row }">
              <el-input v-model="row.submission_people" size="small" placeholder="输入送签员" />
            </template>
          </el-table-column>
        </template>

        <!-- 其他列的默认显示 -->
        <template v-else>
          <el-table-column :prop="col.prop" :label="col.label" :width="col.width"></el-table-column>
        </template>
      </template>
    </el-table>

    <!-- 分页功能 -->
    <el-pagination id="pagination1" class="page-part" v-model:current-page="currentPage1" background
      v-model:page-size="pageSize1" :page-sizes="[20, 50, 100]" layout="total,sizes, prev, pager, next, jumper"
      :total="totalCount1" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const ddlOptions = [
  { value: '欧洲地区', label: '欧洲地区' },
  { value: '澳洲地区', label: '澳洲地区' },
];
const ddlOptions2 = [
  { value: '12月团', label: '12月团' },
  { value: '11月团', label: '11月团' },
  // 更多月份...
];
const formData1 = ref({
  tbx_1e__number: '',
});
const tableData1 = ref([]);
const colOptions = ref([
  { prop: 'remark', label: '备注', isShow: true, width: '' },
  { prop: 'Regiment_number', label: '团号', isShow: true, width: '' },
  { prop: 'intro', label: '行程简介（团期）', isShow: true, width: '' },
  { prop: 'submission_date', label: '送签日', isShow: true, width: '' },
  { prop: 'submission_nation', label: '送签国', isShow: true, width: '' },
  { prop: 'submission_people', label: '送签员', isShow: true, width: '' },
  { prop: 'status', label: '状态', isShow: true, width: '' },
]);
const currentPage1 = ref(1);
const pageSize1 = ref(20);
const totalCount1 = ref(0);

const onSubmit = () => {
  let params = {
    tableName: 'book_info',
    formData: formData1.value,
    pageSize: pageSize1.value,
    currentPage: currentPage1.value,
  };
  axios.post('/queryTable1', params).then(res => {
    if (res.status === 200 && res.data.code === 200) {
      tableData1.value = res.data.data.tableList;
      totalCount1.value = res.data.data.tableCount;
    } else {
      alert('查询失败');
    }
  });
};

const handleSizeChange = () => onSubmit();
const handleCurrentChange = () => onSubmit();

const handleSubmitChanges = () => {
  // 提交修改的数据到后台
  axios.post('/submitChanges', tableData1.value)
    .then(res => {
      if (res.status === 200 && res.data.code === 200) {
        alert('修改提交成功');
      } else {
        alert('提交失败');
      }
    });
};

onMounted(() => {
  onSubmit();  // 页面加载时自动查询数据
});
</script>

<style scoped>
.container-part {
  padding: 20px;
}

.form-part {
  margin-bottom: 20px;
}

.table-part {
  margin-top: 20px;
}

.page-part {
  margin-top: 20px;
}
</style>
