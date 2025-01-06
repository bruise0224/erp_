<template>
  <div class="container-part"> <!--//HTML代码、定义页面的区域-->
    <el-form id="form1" class="form-part" :inline="true" :model="formData1"> <!--//定义表ID，表格样式和数据对象，Vue绑定指令-->
      <el-form-item label="团号" label-width="70">
        <el-input id="tbx_1e__number" v-model="formData1.tbx_1e__number"  MaxLength="20"
          clearable>
        </el-input>
        <!--//为输入框组件进行定义，placeholder为输入框为空时显示一段提示性的灰色占位文字，MaxLength表示最大输入字数-->
      </el-form-item>
      <el-form-item label="团编号:#" label-width="100">
        <el-input id="tbx_1e__group_number" v-model="formData1.tbx_1e__group_number"  MaxLength="20"
          clearable>
        </el-input>
        <!--//为输入框组件进行定义，placeholder为输入框为空时显示一段提示性的灰色占位文字，MaxLength表示最大输入字数-->
      </el-form-item>
      <el-form-item label="领队" label-width="70">
        <el-cascader id="ddl_1e__guide" v-model="ddl_1e__guide" :options="ddlOptions1" clearable />
      </el-form-item>
      <el-form-item label="出发日期" label-width="70">
        <el-input id="tbx_1e__arrive_date" v-model="formData1.tbx_1e__arrive_date" placeholder="查询"  MaxLength="20"
          clearable>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button id="btn_SearchID1" type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addData">新增数据</el-button>
      </el-form-item>
      <router-link to="/zaqizaba/lirunbiao"><button>每月利润表导出</button></router-link>
      <router-link to="/zaqizaba/tixingkuang"><button>重复录入提醒演示</button></router-link>
    </el-form>

    <!--    动态表格  //20231215★★★-->
    <el-table id="table1" class="table-part" :data="tableData1" border>
      <template v-for="col in colOptions">
        <el-table-column :prop="col.prop" :label="col.label" :width="col.width" v-if="col.isShow"></el-table-column>
      </template> 

      <!--//link type为链接以及风格，@click="borrowHandle(row)"：这是 Vue 的事件绑定语法，将按钮的点击事件与名为 borrowHandle 的方法进行绑定。
        当用户点击这个 “借阅” 按钮时，会触发 borrowHandle 方法，并且会将当前行的数据对象 row 作为参数传递给该方法，-->
      <el-table-column fixed="right" label="操作" width="120"><!--//表格列始终固定在右侧-->
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="editHandle(row)">团详情</el-button>
          <el-button link type="danger" size="small" @click.prevent="deleteHandle(row)">删除</el-button>
          <router-link to="/Change/all_change"><button>点击进行团操作</button></router-link>
        </template>
      </el-table-column>
    </el-table>

    <!--//实现分页功能-->
    <el-pagination id="pagination1" class="page-part" v-model:current-page="currentPage1" background
      v-model:page-size="pageSize1" :page-sizes="[20, 50, 100]" layout="total,sizes, prev, pager, next, jumper"
      :total="totalCount1" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

    <!--//实现新增数据页面功能-->
    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form :model="dialogForm" label-width="150px">
        <el-form-item v-for="col in colList" :label="col.label"> 
          <el-input v-model="dialogForm[col.prop]" autocomplete="off" /><!--//关闭浏览器自动完成的功能-->
        </el-form-item> 
      </el-form>
      <template #footer><!--//具名插槽，定义对话框底部的信息-->
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogCancel">确认</el-button>
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
import { ref, reactive, onMounted } from "vue"; //从Vue核心库中导入函数-->
import axios from "axios";
import dataStore from '@/store/storeData';
import { useRoute } from 'vue-router'


const route = new useRoute()

const ddlOptions1 = [
  {
    value: '领队1',
    label: '领队1',
  },
  {
    value: '领队2',
    label: '领队2',
  },
  {
    value: '领队3',
    label: '领队3',
  },
  {
    value: '领队4',
    label: '领队4',
  },
  {
    value: '无领队',
    label: '无领队',
  },
]

//ref为响应式应用，定义初始状态下要显示的信息
const showCols = ref(['Group_number', 'Regiment_number', 'guide', 'tourist_number', 'arrive_date','departure_date',])
//prop代表属性名，isShow为布尔值，用于表示初始状态下是否显示
//数据列  //20231215★★★
const colOptions = ref([
  { prop: 'Group_number', label: '团编号', isShow: true, width: '', formatter: '' },
  { prop: 'Regiment_number', label: '团号', isShow: true, width: '', formatter: '' },
  { prop: 'guide', label: '领队', isShow: true, width: '', formatter: '' },
  { prop: 'tourist_number', label: '游客人数', isShow: true, width: '', formatter: '' },
  { prop: 'arrive_date', label: '到达日期', isShow: true, width: '', formatter: '' },
  { prop: 'departure_date', label: '离开日期', isShow: true, width: '', formatter: '' },
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
    { prop: 'Regiment_number', label: '团号'},
    { prop: 'district', label: '区域'},
    { prop: 'Group_number', label: '团编号'},
    { prop: 'guide', label: '领队(T/L)'},
    { prop: 'Visa_forwarding_agency', label: '送签社'},
    { prop: 'ADS', label: 'ADS号'},
    { prop: 'guide_number', label: '领队数(T/L)'},
    { prop: 'arrive_date', label: '出发日期'},
    { prop: 'departure_date', label: '离开日期'},
    { prop: 'guidenumbe', label: '导游数(LG)'},
    { prop: 'large_number', label: '大人数(ADL)'},
    { prop: 'children_number', label: '小人数(CHD)'},
    { prop: 'Double_room', label: 'Double房'},
    { prop: 'Single_room', label: 'Single房'},
    { prop: 'Twins_room', label: 'Twins房'},
    { prop: 'Apartment', label: 'Apartment'},
    { prop: 'Rollway_Bed', label: 'Rollway Bed'},
    { prop: 'Triple_Share', label: 'Triple Share'},
    { prop: 'Delux', label: 'Delux'},
    { prop: 'delivery_mission', label: '送签使馆'},
    { prop: 'Standardroom_price', label: '标间价格$'},
    { prop: 'Singleroom_price', label: '单间价格$'},
    { prop: 'guide_price', label: '领队价格$'},
    { prop: 'other_price', label: '其他费用$'},
    { prop: 'total_price', label: '总价格$'},
    
    { prop: 'chehang_name', label: '车行名称'},
    { prop: 'siji_name', label: '司机名字'},
    { prop: 'chehang_tel', label: '车行电话'},
    { prop: 'chepaihao', label: '车牌号'},
    { prop: 'lianxiren_name', label: '紧急联系人名字'},
    { prop: 'lianxiren_tel', label: '紧急联系人电话$'},

   
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
  tbx_1e__guide: ''
  ,
})

const showDialog1 = () => {
dialogVisible1.value = true;
};

 const showFileGuide = () => {
   const fileGuideDialog = fileGuideDialog.value;
   fileGuideDialog.showDialog();
 };

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
  dialogTitle.value = '团详情'
  dialogVisible.value = true
  const rowStr = JSON.stringify(row);
  dialogForm.value = JSON.parse(rowStr);
}
const editHandle1 = (row) => {
  //console.log("行数据row", row);
  dialogTitle.value ='数据详情'
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


formData1.value.tbx_1e__number = route.query.number;
formData1.value.tbx_1e__arrive = route.query.arrive;
formData1.value.tbx_1e__guide = route.query.guide;
formData1.value.tbx_1e__arrivedate = route.query.arrivedate;

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