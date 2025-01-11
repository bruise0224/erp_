<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" label-width="68px">
        <el-form-item label="申请人" prop="applicant">
            <el-input
            v-model="queryParams.applicant"
            placeholder="请输入申请人"
            clearable
            @keyup.enter.native="handleQuery"
            style="width: 150px;"
            />
        </el-form-item>
        <el-form-item label="报销金额" prop="cash">
            <el-input
            v-model="queryParams.cash"
            placeholder="请输入报销金额"
            clearable
            @keyup.enter.native="handleQuery"
            style="width: 150px;"
            />
        </el-form-item>
        <el-form-item label="审核状态" prop="status">
            <el-select
                v-model="queryParams.status"
                placeholder="请选择审核状态"
                clearable
                style="width: 150px;"
            >
                <el-option label="老板审核" value="老板审核"></el-option>
                <el-option label="财务审核" value="财务审核"></el-option>
                <el-option label="审核驳回" value="审核驳回"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="报销时间" prop="applyTime">
            <el-date-picker clearable
            v-model="queryParams.applyTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择报销时间" style="width: 200px;">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon=""
          size="mini"
          @click="handleAdd"
        >新增团支出申请</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出*</el-button>
      </el-col>
      <!-- <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar> -->
    </el-row>
    
    <el-table :data="filteredData" >
    <!-- 表格列定义 -->
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
    <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="140px">
        <template #default="{ row }">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(row)"
          >修改*</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete01(row)"
          >撤回*</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
    v-show="total > 0"
    :total="total"
    :page.sync="queryParams.pageNum"
    :limit.sync="queryParams.pageSize"
    />

    <el-dialog :title="title" v-model="open" width="600px" >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="申请人" prop="applicant">
          <span>Admin</span>
        </el-form-item>
        <el-form-item label="所属部门" prop="apartment">
          <el-input v-model="form.apartment" placeholder="请输入所属部门" />
        </el-form-item> 
        <el-form-item label="项目名称" prop="project">
          <el-select v-model="form.project" placeholder="请选择项目名称" style="width: 100%;">
            <el-option
              v-for="item in projectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="销售名称" prop="seller">
          <el-input v-model="form.seller" placeholder="请输入销售名称" />
        </el-form-item>
        <el-form-item label="团号" prop="groupNum">
          <el-select v-model="form.groupNum" placeholder="请选择团号" >
            <el-option
              v-for="item in tbgroupNum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="info">
          <el-input v-model="form.info" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="申请时间" prop="applyTime">
          <el-date-picker clearable v-model="form.applyTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择申请时间" />
        </el-form-item>
        <el-form-item label="收款人名称" prop="payeeName">
          <el-input v-model="form.payeeName" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="收款人银行" prop="payeeBank">
          <el-input v-model="form.payeeBank" placeholder="请输入银行名称" />
        </el-form-item>
        <el-form-item label="付款金额" prop="cash">
          <el-input v-model="form.cash" placeholder="请输入付款金额" />
        </el-form-item>
        <el-form-item label="发票上传*" prop="receiptInfo">
          <!-- <file-upload v-model="form.receiptInfo"/> -->
          <el-button type="primary">文件上传（演示）</el-button>
        </el-form-item>
        <!-- <el-form-item label="审核评价" prop="comment">
          <el-input v-model="form.comment" placeholder="请输入审核评价" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog v-model="deleteDialog" title="是否删除数据?">
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="deleteDialog = false">取消</el-button>
          <el-button type="danger" @click="deleteCommit">确认</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>
  <script>

  import { ElPagination } from 'element-plus';

  export default {
    components: {
      ElPagination,
    },
    props: [],
    data() {
      return {
      open: false, // 对话框显示状态
      deleteDialog: false,
      title: "", // 对话框标题
      tableBackgroundColor: '#ffffff', // 默认背景颜色
      showTable: true, // 是否显示表格
      filteredData: [],
      queryParams: {
        applicant: '',
        cash: '',
        status: '',
        applyTime: '',
        pageNum: 1,
        pageSize: 10
      },
      tableData: [ // 初始化表格数据
        { 
          id: 'T10001', applicant: "Admin", apartment: "销售", 
          project: "提成", seller: "小李", groupNum: "20250105-ABC",
          info: " ", applyTime: "2024-12-21", status: "财务审核",
          payeeName: "小赵", payeeBank: "北京A行B支行", cash: 2500.00,
          receiptInfo: " ", comment: " "
      },
        { 
          id: 'T10002', applicant: "Admin", apartment: "销售", 
          project: "车费", seller: "小李-1800|小徐-200 ", groupNum: "20250108-DEF",
          info: "两人共计3000元某地接驳车费", applyTime: "2024-12-23", status: "老板审核",
          payeeName: "小袁", payeeBank: "陕西A行C支行", cash: 3000.00,
          receiptInfo: " ", comment: " "
      },
      ],

      projectOptions: [
      { label: '车费', value: '车费' },
      { label: '餐费', value: '餐费' },
      { label: '门票', value: '门票' },
      { label: '其他', value: '其他' },
      // 添加更多项目选项
    ],
    tbgroupNum: [
      { label: '20250105-ABC', value: '20250105-ABC' },
      { label: '20250106-N-232D', value: '20250106-N-232D' },
      // 添加更多项目选项
    ],

      form: {
      id: "",
      applicant: "",
      apartment: "",
      project: "",
      seller: "",
      groupNum: "",
      info: "",
      applyTime: "",
      status: "",
      payeeName: "",
      payeeBank: "",
      cash: "",
      receiptInfo: "",
      comment: ""
      },
      rules: {
        // applicant: [{ required: true, message: "申请人不能为空", trigger: "blur" }],
        apartment: [{ required: true, message: "所属部门不能为空", trigger: "blur" }],
        project: [{ required: true, message: "项目名称不能为空", trigger: "blur" }],
        seller: [{ required: true, message: "销售名称不能为空", trigger: "blur" }],
        groupNum: [{ required: true, message: "团号不能为空", trigger: "blur" }],
        applyTime: [{ required: true, message: "申请时间不能为空", trigger: "change" }],
        // status: [{ required: true, message: "审核状态不能为空", trigger: "change" }],
        cash: [{ required: true, message: "付款金额不能为空", trigger: "blur" }]
      }
      };
    },
    computed: {
    total() {
      return this.filteredData.length;
        }
    },
    watch: {},
    created() {
        this.filteredData = this.tableData;
    },
    mounted() {},
    methods: {
  
    resetQuery() {
      this.$refs['queryForm'].resetFields();
      this.queryParams = {
        applicant: '',
        cash: '',
        status: '',
        applyTime: '',
        pageNum: 1,
        pageSize: 10
      };
      this.filteredData = this.tableData;
    },
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.filterData();
    },
    filterData() {
      this.filteredData = this.tableData.filter(item => {
        return (
          (!this.queryParams.applicant || item.applicant.includes(this.queryParams.applicant)) &&
          (!this.queryParams.cash || item.cash.toString().includes(this.queryParams.cash)) &&
          (!this.queryParams.status || item.status.includes(this.queryParams.status)) &&
          (!this.queryParams.applyTime || item.applyTime === this.queryParams.applyTime)
        );
      });
    },
    handleExport() {
      this.$message.warning('暂未连接数据库，Excel表导出功能暂不能使用');
    },

    handleUpdate(row) {
      this.$message.warning('已进入审核阶段，无法进行修改');
    },

    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加报销信息";
    },

    reset() {
      this.form = {
        id: "",
        applicant: "",
        apartment: "",
        project: "",
        seller: "",
        groupNum: "",
        info: "",
        applyTime: "",
        status: "",
        payeeName: "",
        payeeBank: "",
        cash: "",
        receiptInfo: "",
        comment: ""
      };
      // console.log(this);
      // this.resetForm("form");
    },

    // 取消按钮操作
    cancel() {
      this.open = false;
      this.reset();
    },

    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          // 生成唯一的ID
          const newId = "T" + (parseInt(this.tableData[this.tableData.length - 1].id.substring(1)) + 1).toString().padStart(4, '0');
          this.form.id = newId;
          this.form.status = "老板审核";
          this.form.applicant = "Admin";
          
          // 添加到表格数据
          this.tableData.push(this.form);
          this.filterData();
          
          // 关闭对话框
          this.open = false;
          // this.reset();
          this.$message.success("添加成功");
        }
      });
    },

    handleDelete(row) {
    // 假设 row 中有一个唯一的标识符，比如 id
    console.log(row);
    const id = row.id;
    // 从 tableData 中移除该行数据
    this.$modal.confirm('是否确认删除报销信息编号为"' + id + '"的数据项？')
    .then(() => {
      // 用户点击确认后执行删除操作
      this.tableData = this.tableData.filter(item => item.id !== id);
      this.filterData();
      this.$message.success('删除成功');
    })
    .catch(() => {
      // 用户点击取消后执行的操作（可选）
      this.$message.info('已取消删除');
    });
  },

  handleDelete01(row) {
    // 假设 row 中有一个唯一的标识符，比如 id
    console.log(row);
    const id = row.id;
    // 从 tableData 中移除该行数据
      // 用户点击确认后执行删除操作
      this.tableData = this.tableData.filter(item => item.id !== id);
      this.filterData();
      this.$message.success('删除成功');
  }

  }
};
  </script>
  <style scoped>

  </style>
  