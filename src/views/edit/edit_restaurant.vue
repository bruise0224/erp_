<template>
  <div class="container-part">
      <el-form id="form1" class="form-part" :inline="true" :model="formData1">
              <el-form-item label="餐厅名称" label-width="70">
                     <el-input id="reader_name" v-model="formData1.reader_name" placeholder="模糊查询" MaxLength="20" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="城市" label-width="70"><!--//定义表中的标签，标签的宽度（像素）-->
                  <el-cascader id="ddl_1e__book_city" v-model="ddl_1e__book_city" :options="ddlOptions" clearable />
                  </el-form-item>
                  <el-form-item>
                      <el-button id="btn_SearchID1" type="primary" @click="onSubmit">查询</el-button>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" @click="addData">新增数据</el-button>
                  </el-form-item>
      </el-form>

      <el-table id="table1" class="table-part" :data="tableData1" border>
          <el-table-column prop="restaurant" label="餐厅名称" ></el-table-column>
          <el-table-column prop="city" label="所在城市" ></el-table-column>
          <el-table-column prop="large_noonprice" label="成人午餐" ></el-table-column>
          <el-table-column prop="large_nightprice" label="成人晚餐" ></el-table-column>
          <el-table-column prop="children_noonprice" label="儿童午餐" ></el-table-column>
          <el-table-column prop="children_nightprice" label="儿童晚餐" ></el-table-column>

          <el-table-column fixed="right" label="数据操作" width="120">
              <template #default="{ row }">
                  <el-button link type="primary" size="small" @click="editHandle(row)">编辑</el-button>
              </template>
          </el-table-column>
      </el-table>
      <!--//实现分页功能--> 
      <el-pagination id="pagination1" class="page-part" v-model:current-page="currentPage1" background
          v-model:page-size="pageSize1" :page-sizes="[100,200,300]" layout="total,sizes, prev, pager, next, jumper"
          :total="totalCount1" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      <!--//实现新增数据页面功能-->
      <el-dialog v-model="dialogVisible" :title="dialogTitle">
          <el-form :model="dialogForm" label-width="150px">
              <el-form-item v-for="col in colList" :label="col.label">
                  <el-input v-model="dialogForm[col.prop]" autocomplete="off" />
              </el-form-item>
          </el-form>
          <template #footer>
              <span class="dialog-footer">
                  <el-button type="primary" @click="dialogCancel">取消</el-button>
                  <el-button type="primary" @click="dialogCommit">确认</el-button>
              </span>
          </template>
      </el-dialog>

      <el-dialog v-model="deleteDialogFormVisible" title="是否删除数据?">
          <template #footer>
              <span class="dialog-footer">
                  <el-button type="primary" @click="deleteDialogFormVisible = false">取消</el-button>
                  <el-button type="danger" @click="deleteCommit">确认</el-button>
              </span>
          </template>
      </el-dialog>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";

const ddlOptions = [
  {
    value: '所有城市',
    label: '所有城市',
  },
  {
    value: '城市1',
    label: '城市1',
  },
  {
    value: '城市2',
    label: '城市2',
  },
  {
    value: '城市3',
    label: '城市3',
  },
  {
    value: '城市4',
    label: '城市4',
  },
]

onMounted(() => {
  onSubmit()
})

const colList = ref(
  [
    { prop: 'restaurant', label: '餐厅名称' },
    { prop: 'city', label: '所在城市' },
    { prop: 'person', label: '联系人' },
    { prop: 'tel', label: '联系电话' },
    { prop: 'fax', label: '联系传真' },
    { prop: 'Email', label: 'Email' },
    { prop: 'hotel_adress', label: '地址' },
    { prop: 'large_noonprice', label: '成人午餐' },
    { prop: 'large_nightprice', label: '成人晚餐' },
    { prop: 'children_noonprice', label: '儿童午餐' },
    { prop: 'children_nightprice', label: '儿童晚餐' },
    { prop: 'adress', label: '网址' },
    { prop: 'link', label: '合同链接' },
    { prop: 'hotel_message', label: '备注信息' },

  ]
)

const formData1 = reactive({
  reader_name: '',

})
const emptyDialogForm = {
  seq: '',
  reader_id: '',
  reader_name: '',
  in_time: new Date(),
  out_time: new Date(),
  read_time: '',

}
const dialogForm = ref(emptyDialogForm)
const tableData1 = ref();
const currentPage1 = ref(1);
const pageSize1 = ref(100);
const totalCount1 = ref(0);

const dialogVisible = ref(false)
const dialogTitle = ref('')


const handleSizeChange = (val) => {
  onSubmit()
}

const handleCurrentChange = (val) => {
  onSubmit()
}

const onSubmit = () => {
  let params = {
      tableName: 'VISIT_INFO',
      formData: formData1,
      pageSize: pageSize1.value,
      currentPage: currentPage1.value,
  }
  axios.post('/queryTable1', params)
      .then(res => {
          if (res.status == 200) {
            //console.log("res:", res);
              if (res.data.code == 200) {
                  tableData1.value = res.data.data.tableList;
                  totalCount1.value = res.data.data.tableCount;
                  // ElMessage({
                  //     showClose: false,
                  //     message: '查询成功',
                  //     type: 'success',
                  // })
              } else if (
                  res.data.code == "500"
              ) {
                  ElMessage({
                      showClose: true,
                      message: '查询失败' + res.data.msg,
                      type: 'error',
                  })
              }
          } else if (res.status == 500) {
              ElMessage({
                  showClose: true,
                  message: '查询失败' + res.data.msg,
                  type: 'error',
              })
          }
      })
}
const formatCellDate = (row, column) => {
  let data = row[column.property]
  return formatDate(data)
}
const formatDate = (data) => {
  if (data == null) {
      return null
  }
  let dt = new Date(data)
  return dt.getFullYear() + '-' + (dt.getMonth() + 1).toString().padStart(2, '0') + '-' + dt.getDate().toString().padStart(2, '0')
      + ' ' + dt.getHours().toString().padStart(2, '0') + ':' + dt.getMinutes().toString().padStart(2, '0') + ':'
      + dt.getSeconds().toString().padStart(2, '0');
}

const addData = () => {
  dialogTitle.value = '新增数据'
  dialogVisible.value = true
  dialogForm.value = emptyDialogForm
}

const dialogCommit = () => {
  if (dialogTitle.value == '新增数据') {
      addCommit()
  }
  else if (dialogTitle.value == '编辑数据') {
      editCommit()
  }
}
const dialogCancel = () => {
  if (dialogTitle.value = '新增数据') {
      dialogVisible.value = false
      dialogTitle.value = ''
  }
  else if (dialogTitle.value = '编辑数据') {
      onSubmit()
      dialogVisible.value = false
      dialogTitle.value = ''
  }
}

const addCommit = () => {
  let params = {
      tableName: 'VISIT_INFO',
      formData: formData1,
      modelData: dialogForm.value,
      pageSize: pageSize1.value,
      currentPage: currentPage1.value,
  }
  axios.post('/addHandel', params)
      .then(res => {
          if (res.status == 200) {
            //console.log("res:", res);
              if (res.data.code == 200) {
                  tableData1.value = res.data.data.tableList;
                  totalCount1.value = res.data.data.tableCount;
                  ElMessage({
                      showClose: false,
                      message: '新增成功',
                      type: 'success',
                  })
              } else if (
                  res.data.code == "500"
              ) {
                  ElMessage({
                      showClose: true,
                      message: '新增失败' + res.data.msg,
                      type: 'error',
                  })
              }
          } else if (res.status == 500) {
              ElMessage({
                  showClose: true,
                  message: '新增失败' + res.data.msg,
                  type: 'error',
              })
          }
      })
}

const editHandle = (row) => {
//console.log("行数据row", row);
  dialogTitle.value = '编辑数据'
  dialogVisible.value = true
  const rowStr = JSON.stringify(row);
  dialogForm.value = JSON.parse(rowStr);
}
const editCommit = () => {
  let params = {
      tableName: 'VISIT_INFO',
      formData: formData1,
      modelData: dialogForm.value,
      pageSize: pageSize1.value,
      currentPage: currentPage1.value,
  }
  axios.post('/editHandel', params)
      .then(res => {
          if (res.status == 200) {
            //console.log("res:", res);
              if (res.data.code == 200) {
                  tableData1.value = res.data.data.tableList;
                  totalCount1.value = res.data.data.tableCount;
                  ElMessage({
                      showClose: false,
                      message: '执行成功',
                      type: 'success',
                  })
              } else if (
                  res.data.code == "500"
              ) {
                  ElMessage({
                      showClose: true,
                      message: '执行失败' + res.data.msg,
                      type: 'error',
                  })
              }
          } else if (res.status == 500) {
              ElMessage({
                  showClose: true,
                  message: '执行失败' + res.data.msg,
                  type: 'error',
              })
          }
      })
}

const deleteDialogFormVisible = ref(false)
const deleteDialogForm = ref({});

const deleteHandle = (row) => {
  deleteDialogFormVisible.value = true
  deleteDialogForm.value = row
}
const deleteCancel = () => {
  deleteDialogFormVisible.value = false
}
const deleteCommit = () => {
  let params = {
      tableName: 'VISIT_INFO',
      formData: formData1,
      modelData: deleteDialogForm.value,
      pageSize: pageSize1.value,
      currentPage: currentPage1.value,
  }

  axios.post('/deleteHandel', params)
      .then(res => {
          if (res.status == 200) {
            //console.log("res:", res);
              if (res.data.code == 200) {
                  tableData1.value = res.data.data.tableList;
                  totalCount1.value = res.data.data.tableCount;
                  ElMessage({
                      showClose: false,
                      message: '删除成功',
                      type: 'success',
                  })
              } else if (
                  res.data.code == "500"
              ) {
                  ElMessage({
                      showClose: true,
                      message: '删除失败' + res.data.msg,
                      type: 'error',
                  })
              }
          } else if (res.status == 500) {
              ElMessage({
                  showClose: true,
                  message: '删除失败' + res.data.msg,
                  type: 'error',
              })
          }
      })
  deleteDialogFormVisible.value = false
}



</script>

<style scoped>
.container-part {
  height: 100%;
  
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
}

.form-part {
  display: flex;
  justify-content: space-between;
  height: 40px;
  padding: 8px;
  margin: 4px 0;
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: 3px -3px 4px -3px rgb(157, 154, 154);
  /*倒角*/
  
}

.table-part {
  flex: 1;
  box-shadow: 3px -3px 4px -3px rgb(157, 155, 155);
  padding: 8px;
  margin: 4px 0;
  border-radius: 8px;
}

.page-part {
  height: 10px;

  padding: 10px;
  border-radius: 6px;
  background-color: #ffffff;
}
</style>