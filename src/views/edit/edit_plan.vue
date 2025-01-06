<template>
  <div class="container-part"> <!--//HTML代码、定义页面的区域-->
    <el-form id="form1" class="form-part" :inline="true" :model="formData1"> <!--//定义表ID，表格样式和数据对象，Vue绑定指令-->
      <el-form-item label="月份" label-width="70"><!--//定义表中的标签，标签的宽度（像素）-->
        <el-cascader id="ddl_1e__month" v-model="ddl_1e__month" :options="ddlOptions2" clearable />
        <!--//创建地区选择器，定义ID，v-model将el-cascader和ID进行双向绑定，options将ddlOptions变量和el-cascader绑定，clearable可以进行清除-->
      </el-form-item>
      <el-form-item label="地区" label-width="70">
        <el-cascader id="ddl_1e__district" v-model="ddl_1e__district" :options="ddlOptions" placeholder="欧洲团" clearable />
      </el-form-item>
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
          <el-button link type="primary" size="small" @click="editHandle(row)">修改行程文件地址</el-button>
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
          <el-button type="primary" @click="dialogCancel">取消</el-button>
          <el-button type="primary" @click="dialogCommit">确认</el-button>
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


const ddlOptions = [
  {
    value: '欧洲地区',
    label: '欧洲地区',
    //子选项的功能-->
  },
  {
    value: '澳洲地区',
    label: '澳洲地区',
  },
]

const ddlOptions2 = [
  {
    value: '12月团',
    label: '12月团',
  },
  {
    value: '11月团',
    label: '11月团',
  },
  {
    value: '10月团',
    label: '10月团',
  },
  {
    value: '9月团',
    label: '9月团',
  },
  {
    value: '8月团',
    label: '8月团',
  },
  {
    value: '7月团',
    label: '7月团',
  },
  {
    value: '6月团',
    label: '6月团',
  },
  {
    value: '5月团',
    label: '5月团',
  },
  {
    value: '4月团',
    label: '4月团',
  },
  {
    value: '3月团',
    label: '3月团',
  },
  {
    value: '2月团',
    label: '2月团',
  },
  {
    value: '1月团',
    label: '1月团',
  },
]

//ref为响应式应用，定义初始状态下要显示的信息
const showCols = ref(['Regiment_number', 'plan_adress','intro','status','special'])
//prop代表属性名，isShow为布尔值，用于表示初始状态下是否显示
//数据列  //20231215★★★
const colOptions = ref([
  { prop: 'Regiment_number', label: '团号', isShow: true, width: '', formatter: '' },
  { prop: 'intro', label: '行程简介（团期）', isShow: true, width: '', formatter: '' },
  { prop: 'special', label: '特色亮点', isShow: true, width: '', formatter: '' },
  { prop: 'plan_adress', label: '行程文件地址', isShow: true, width: '', formatter: '' },
  { prop: 'status', label: '状态', isShow: true, width: '', formatter: '' },
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
    { prop: 'remark', label: '备注'},
    { prop: 'Regiment_number', label: '团号'},
    { prop: 'intro', label: '行程简介（团期）'},
    { prop: 'price', label: '价格'},
    { prop: 'market', label: '市场价'},
    { prop: 'depart', label: '出发地'},
    { prop: 'additional_charge', label: '附加费'},
    { prop: 'guide', label: '领队'},
    { prop: 'operate', label: '操作'},
    { prop: 'ticket', label: '票务'},
    { prop: 'submission_date', label: '送签日'},
    { prop: 'submission_nation', label: '送签国'},
    { prop: 'submission_people', label: '送签员'},
    { prop: 'seat', label: '席位'},
    { prop: 'residue', label: '余位'},
    { prop: 'forecast', label: '预报'},
    { prop: 'arrived', label: '已到'},
    { prop: 'status', label: '状态'},
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