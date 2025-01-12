<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="申请人" prop="applicant">
        <el-input
          v-model="queryParams.applicant"
          placeholder="请输入申请人"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审核状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择审核状态"
          clearable
          style="width: 150px;"
          @keyup.enter="handleQuery"
        >
          <el-option label="老板审核" value="老板审核"></el-option>
          <el-option label="财务审核" value="财务审核"></el-option>
          <el-option label="审核驳回" value="审核驳回"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="报销金额" prop="cash">
        <el-input
          v-model="queryParams.cash"
          placeholder="请输入报销金额"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报销时间" prop="applyTime">
        <el-date-picker clearable
          v-model="queryParams.applyTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择报销时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
        >新增</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
        >导出*</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table :data="reimbursement_infoList">
      <el-table-column label="序号" type="index" width="50" align="center" />
      <el-table-column align="center" prop="id" label="ID" width="80"></el-table-column>
      <el-table-column align="center" prop="applicant" label="申请人" width="80"></el-table-column>
      <el-table-column align="center" prop="apartment" label="所属部门" width="80"></el-table-column>
      <el-table-column align="center" prop="project" label="项目名称" width="80"></el-table-column>
      <el-table-column align="center" prop="seller" label="销售名称"></el-table-column>
      <el-table-column align="center" prop="groupNum" label="团号"></el-table-column>
      <el-table-column align="center" prop="info" label="备注" width="250"></el-table-column>
      <el-table-column align="center" prop="applyTime" label="申请时间"></el-table-column>
      <el-table-column align="center" prop="status" label="审核状态"></el-table-column>
      <el-table-column align="center" prop="cash" label="付款金额"></el-table-column>
      <el-table-column align="center" prop="receiptInfo" label="发票上传"></el-table-column>
      <el-table-column align="center" prop="comment" label="审核评价"></el-table-column>
    </el-table>
    
    <!-- <el-pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    /> -->

    <!-- 添加或修改报销信息对话框 -->
    <!-- <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="reimbursement_infoRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="申请人" prop="name">
          <el-input v-model="form.name" placeholder="请输入申请人" />
        </el-form-item>
        <el-form-item label="地区" prop="region">
          <el-input v-model="form.region" placeholder="请输入地区" />
        </el-form-item>
        <el-form-item label="报销金额" prop="cash">
          <el-input v-model="form.cash" placeholder="请输入报销金额" />
        </el-form-item>
        <el-form-item label="备注" prop="info">
          <el-input v-model="form.info" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="报销时间" prop="applyTime">
          <el-date-picker clearable
            v-model="form.applyTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择报销时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审核评价" prop="comment">
          <el-input v-model="form.comment" placeholder="请输入审核评价" />
        </el-form-item>
        <el-form-item label="摊销开始时间" prop="amoStartTime">
          <el-date-picker clearable
            v-model="form.amoStartTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择摊销开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="摊销结束时间" prop="amoEndTime">
          <el-date-picker clearable
            v-model="form.amoEndTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择摊销结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报销开户行" prop="bankName">
          <el-input v-model="form.bankName" placeholder="请输入报销开户行" />
        </el-form-item>
        <el-form-item label="报销账号" prop="bankId">
          <el-input v-model="form.bankId" placeholder="请输入报销账号" />
        </el-form-item>
        <el-form-item label="票据文件*" prop="receiptInfo">
          <file-upload v-model="form.receiptInfo"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog> -->
  </div>
</template>

<script setup >
import { ref, reactive, getCurrentInstance, toRefs } from "vue";
import { ElMessage } from 'element-plus';

// const { proxy } = getCurrentInstance();

const reimbursement_infoList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    applicant: null,
    cash: null,
    applyTime: null,
    status: null,
  },
  rules: {
    id: [
      { required: true, message: "ID不能为空", trigger: "blur" }
    ],
    applicant: [
      { required: true, message: "申请人不能为空", trigger: "blur" }
    ],
    region: [
      { required: true, message: "地区不能为空", trigger: "blur" }
    ],
    type: [
      { required: true, message: "报销费用类型不能为空", trigger: "change" }
    ],
    cash: [
      { required: true, message: "报销金额不能为空", trigger: "blur" }
    ],
    applyTime: [
      { required: true, message: "报销时间不能为空", trigger: "blur" }
    ],
    bankName: [
      { required: true, message: "报销开户行不能为空", trigger: "blur" }
    ],
    bankId: [
      { required: true, message: "报销账号不能为空", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

function fetchData() {
  // 模拟从后端获取数据
  const datas = [
    { 
      id: 'T10001', applicant: "小王", apartment: "销售", project:"提成", 
      seller: "小李", groupNum: "20250105-ABC", info: " ", applyTime: "2024-12-21", 
      status: "财务审核", cash: "2500", receiptInfo: " ", comment: " " 
    },
    { 
      id: 'T10002', applicant: "小张", apartment: "市场", project:"广告",
      seller: "小徐", groupNum: "20250108-DEF", info: "两人共计3000元某地接驳车费", 
      applyTime: "2024-12-23", status: "老板审核", cash: "3000", receiptInfo: " ", comment: " " 
    }
  ];

  // 更新reimbursement_infoList
  reimbursement_infoList.value = datas;
  console.log(datas);
}

fetchData();

/** 查询报销信息列表 */
function getList() {
  loading.value = true;
  const { applicant, status, cash, applyTime } = queryParams.value;
  
  // 根据 queryParams.value  reimbursement_info 的条件筛选 reimbursement_infoList
  const filteredList = reimbursement_infoList.value.filter(item => {
    return (
      (!applicant || item.applicant === applicant) &&
      (!status || item.status === status) &&
      (!cash || item.cash === cash) &&
      (!applyTime || item.applyTime === applyTime)
    );
  });
  
  // 更新筛选后的列表和总条数
  reimbursement_infoList.value = filteredList;
  total.value = filteredList.length;
  
  loading.value = false;
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    id: null,
    name: null,
    region: null,
    type: null,
    cash: null,
    info: null,
    applyTime: null,
    status: null,
    comment: null,
    amoStartTime: null,
    amoEndTime: null,
    bankName: null,
    bankId: null,
    receiptInfo: null
  };
  proxy.resetForm("reimbursement_infoRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.applicant = form.applicant;
  queryParams.status = form.status;
  queryParams.cash = form.cash;
  queryParams.applyTime = form.applyTime;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  // 重置查询参数为初始值
  queryParams.value = {
    applicant: '',
    status: '',
    cash: '',
    applyTime: ''
  };
  
  // 调用 getList 方法重新获取数据
  getList();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加报销信息";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getReimbursement_info(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改报销信息";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["reimbursement_infoRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateReimbursement_info(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addReimbursement_info(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除报销信息编号为"' + _ids + '"的数据项？').then(function() {
    return delReimbursement_info(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  ElMessage.warning('暂未连接数据库，Excel表导出功能暂不能使用');
}

getList();
</script>

<style scoped>
/* .container-part {
  height: 100%;

  height: 100vh;
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
  倒角

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
} */
</style>