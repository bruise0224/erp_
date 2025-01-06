<template>
  <div class="container-part"> <!--//HTML代码、定义页面的区域-->
    <el-form id="form1" class="form-part" :inline="true" :model="formData1"> <!--//定义表ID，表格样式和数据对象，Vue绑定指令-->
      <el-form-item label="申请工作提醒" label-width="150" style="text-align:center">
      </el-form-item>
    </el-form>

    <!--    动态表格  //20231215★★★-->
    <el-table id="table1" class="table-part" :data="tableData1" border>
      <template v-for="col in colOptions">
        <el-table-column :prop="col.prop" :label="col.label" :width="col.width" v-if="col.isShow"></el-table-column>
      </template> 
      <el-table-column fixed="right" label="处理申请" width="120"><!--//表格列始终固定在右侧-->
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="editHandle(row)">同意</el-button>
          <el-button link type="danger"  size="small" @click.prevent="deleteHandle(row)">退回</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!--//实现分页功能-->
    <el-pagination id="pagination1" class="page-part" v-model:current-page="currentPage1" background
      v-model:page-size="pageSize1" :page-sizes="[10, 20, 30]" layout="total,sizes, prev, pager, next, jumper"
      :total="totalCount1" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

    <el-dialog v-model="deleteDialogFormVisible" title="是否退回?">
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
import { ref, reactive, onMounted } from "vue"; //从Vue核心库中导入函数-->
import axios from "axios";
import dataStore from '@/store/storeData';
import { useRoute } from 'vue-router'

const route = new useRoute()

//ref为响应式应用，定义初始状态下要显示的信息
const showCols = ref([, '团号', '行程简介（团期）', '送签日', '席位', '余位',])
//prop代表属性名，isShow为布尔值，用于表示初始状态下是否显示
//数据列  //20231215★★★
const colOptions = ref([
  { prop: 'Regiment_number', label: '团号', isShow: true, width: '', formatter: '' },
  { prop: 'intro', label: '行程简介（团期）', isShow: true, width: '', formatter: '' },
  { prop: 'seat', label: '席位', isShow: true, width: '', formatter: '' },
  { prop: 'residue', label: '余位', isShow: true, width: '', formatter: '' },
  { prop: 'submission_date', label: '送签日', isShow: true, width: '', formatter: '' },
])

////20231215★★★
const hideCol = (value) => {
  //先都隐藏, 选中的值展示;
  for (let i = 0, len = colOptions.value.length; i < len; i++) {
    colOptions.value[i].isShow = false
  }
  // console.log(colOptions.value)
  if (value.length > 0) {
    //console.log(value)

    for (let j = 0, lenj = value.length; j < lenj; j++) {
      for (let i = 0, len = colOptions.value.length; i < len; i++) {
        if (colOptions.value[i].prop == value[j]) {
          //console.log(value[j])
          //console.log(colOptions.value[i])
          colOptions.value[i].isShow = true
        }
      }
    }
  }
  // console.log(colOptions.value)
}
const pulicStore = dataStore()

onMounted(() => {
  onSubmit()
})
const ddl_1e__district =ref()
const colList = ref(
  [
    { prop: 'Regiment_number', label: '团号' },
    { prop: 'guide', label: '领队' },
    { prop: 'intro', label: '行程简介（团期）' },
    { prop: 'seat', label: '席位' },
    { prop: 'residue', label: '余位' },
    { prop: 'submission_date', label: '送签日' },
  ]
)
//响应式引用
const borrowDialogVisible = ref(false)
const borrow_days = ref()
const borrowDFModel = ref()

const borrowCommit = () => {
  let params = {
    user_id: pulicStore.user_id,
    user_name: pulicStore.user_name,
    book_id: borrowDFModel.value.book_id,
    book_name: borrowDFModel.value.book_name,
    borrow_days: borrow_days.value,
  }
  axios.post('/BOOK_INFO/borrowHandel', params)
    .then(res => {
      if (res.status == 200) {
        //console.log("res:", res);
        if (res.data.code == 200) {
          ElMessage({
            showClose: false,
            message: res.data.data,
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
const borrowClose = () => {
  //刷新画面
  onSubmit()
}

const formData1 = ref({
  tbx_1e__book_number: '',
  tbx_1e__guide: '',
})

const emptyDialogForm = {
  seq: '',
  book_id: '',
  book_name: '',
  author: '',
  no: '',
  press: '',
  publication_date: new Date(),
  book_class: '',
  loc: '',
  cover_url: new Date(),
  cover_url: '',
  stock_num: '',
  margin_num: '',
}
const dialogForm = ref(emptyDialogForm)
const tableData1 = ref();
const currentPage1 = ref(1);
const pageSize1 = ref(10);
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
    tableName: 'book_info',
    formData: formData1.value,
    pageSize: pageSize1.value,
    currentPage: currentPage1.value,
  }
  axios.post('/queryTable1', params)
    .then(res => {
      if (res.status == 200) {
        console.log("res:", res);
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
//新增数据列表的操作
const addData = () => {
  dialogTitle.value = '新增数据'
  dialogVisible.value = true
  dialogForm.value = emptyDialogForm
}

const dialogCommit = () => {
  if (dialogTitle.value == '新增数据') {
    addCommit()
  } else if (dialogTitle.value == '编辑数据') {
    editCommit()
  }
}
const dialogCancel = () => {
  if (dialogTitle.value = '新增数据') {
    dialogVisible.value = false
    dialogTitle.value = ''
  } else if (dialogTitle.value = '编辑数据') {
    onSubmit()
    dialogVisible.value = false
    dialogTitle.value = ''
  }
}

const addCommit = () => {
  let params = {
    tableName: 'book_info',
    formData: formData1.value,
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
    tableName: 'book_info',
    formData: formData1.value,
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
    tableName: 'book_info',
    formData: formData1.value,
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
            message: '退回成功',
            type: 'success',
          })
        } else if (
          res.data.code == "500"
        ) {
          ElMessage({
            showClose: true,
            message: '退回失败' + res.data.msg,
            type: 'error',
          })
        }
      } else if (res.status == 500) {
        ElMessage({
          showClose: true,
          message: '退回失败' + res.data.msg,
          type: 'error',
        })
      }
    })
  deleteDialogFormVisible.value = false
}


formData1.value.tbx_1e__number = route.query.number;
formData1.value.tbx_1e__arrive = route.query.arrive;
formData1.value.tbx_1e__guide = route.query.guide;

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