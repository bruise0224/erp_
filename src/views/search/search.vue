<template>
  <div class="form-container">
    <el-row :gutter="15" class="custom-form">
      <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="100px"
        label-position="left" >
        <el-col :span="24" >
          <el-row gutter="15">
            <el-col :span="7">
              <el-form-item label-width="54px" label="委托社" prop="field106">
                <el-cascader v-model="formData.field106" :options="field106Options" :props="field106Props"
                  :style="{width: '100%'}" placeholder="请选择委托社" clearable></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label-width="54px" label="操作人" prop="field107">
                <el-select v-model="formData.field107" placeholder="请选择操作人" clearable
                  :style="{width: '100%'}">
                  <el-option v-for="(item, index) in field107Options" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label-width="40px" label="状态" prop="field112">
                <el-radio-group v-model="formData.field112" size="medium">
                  <el-radio v-for="(item, index) in field112Options" :key="index" :label="item.value"
                    :disabled="item.disabled">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="24">
          <el-row gutter="15">
            <el-col :span="7">
              <el-form-item label-width="68px" label="目的区域" prop="field115">
                <el-select v-model="formData.field115" placeholder="请选择目的区域" clearable
                  :style="{width: '100%'}">
                  <el-option v-for="(item, index) in field115Options" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label-width="40px" label="销售" prop="field116">
                <el-select v-model="formData.field116" placeholder="请选择销售" clearable :style="{width: '100%'}">
                  <el-option v-for="(item, index) in field116Options" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label-width="54px" label="团类型" prop="field117">
                <el-radio-group v-model="formData.field117" size="medium">
                  <el-radio v-for="(item, index) in field117Options" :key="index" :label="item.value"
                    :disabled="item.disabled">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="24">
          <el-row gutter="15">
            <el-col :span="7">
              <el-form-item label-width="96px" label="销售所属大区" prop="field119">
                <el-select v-model="formData.field119" placeholder="请选择销售所属大区" clearable
                  :style="{width: '100%'}">
                  <el-option v-for="(item, index) in field119Options" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label-width="54px" label="送签员" prop="field120">
                <el-select v-model="formData.field120" placeholder="请选择送签员" clearable
                  :style="{width: '100%'}">
                  <el-option v-for="(item, index) in field120Options" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label-width="68px" label="核算类型" prop="field121">
                <el-radio-group v-model="formData.field121" size="medium">
                  <el-radio v-for="(item, index) in field121Options" :key="index" :label="item.value"
                    :disabled="item.disabled">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="24">
          <el-row gutter="15">
            <el-col :span="23">
              <el-form-item label-width="68px" label="统计类型" prop="field123">
                <el-radio-group v-model="formData.field123" size="medium">
                  <el-radio v-for="(item, index) in field123Options" :key="index" :label="item.value"
                    :disabled="item.disabled">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="23">
          <el-row gutter="15">
            <!-- <el-col :span="12">
              <el-form-item label="日期范围" prop="field127">
                <el-date-picker type="daterange" v-model="formData.field127" format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd" :style="{width: '100%'}" start-placeholder="开始日期"
                  end-placeholder="结束日期" range-separator="至" clearable></el-date-picker>
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item label-width="160px" label="" prop="field128">
                <el-button type="primary" icon="el-icon-search" size="medium" @click="submitForm"> 搜索 </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-form>
    </el-row>

    <el-col :span="24" v-if="showTable">
      <el-table :data="tableData" :header-cell-style="{ backgroundColor: tableBackgroundColor }">
        <!-- 表格列定义 -->
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
      </el-table>
    </el-col>

  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        field106: [],
        field107: undefined,
        field112: 0,
        field115: 0,
        field116: undefined,
        field117: 0,
        field119: 0,
        field120: undefined,
        field121: 0,
        field123: undefined,
        field127: null,
        field128: '',
      },
      rules: {
        field106: [],
        field107: [],
        field112: [],
        field115: [],
        field116: [],
        field117: [],
        field119: [],
        field120: [],
        field121: [],
        field123: [],
        field127: [{
          required: true,
          message: '日期范围不能为空',
          trigger: 'change'
        }],
      },
      field106Options: [],
      field107Options: [{
        "label": "测试1",
        "value": 1
      }, {
        "label": "测试2",
        "value": 2
      }],
      field112Options: [{
        "label": "封团",
        "value": 1
      }, {
        "label": "进行中",
        "value": 2
      }, {
        "label": "全部",
        "value": 0
      }],
      field115Options: [{
        "label": "澳洲团",
        "value": 1
      }, {
        "label": "欧洲团",
        "value": 2
      }, {
        "label": "国内团",
        "value": 3
      }, {
        "label": "不限",
        "value": 0
      }],
      field116Options: [{
        "label": "销售1",
        "value": 1
      }, {
        "label": "销售2",
        "value": 2
      }],
      field117Options: [{
        "label": "单签",
        "value": 1
      }, {
        "label": "单团",
        "value": 2
      }, {
        "label": "拼散",
        "value": 3
      }, {
        "label": "全部",
        "value": 0
      }],
      field119Options: [{
        "label": "北京",
        "value": 1
      }, {
        "label": "东三省",
        "value": 2
      }, {
        "label": "不限",
        "value": 0
      }],
      field120Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field121Options: [{
        "label": "单团毛利",
        "value": 1
      }, {
        "label": "散拼人数",
        "value": 2
      }, {
        "label": "不限",
        "value": 0
      }],
      field123Options: [{
        "label": "财务核算表",
        "value": 1
      }, {
        "label": "销售业绩核算表",
        "value": 2
      }, {
        "label": "收客人数统计表",
        "value": 3
      }, {
        "label": "签证统计表",
        "value": 4
      }, {
        "label": "销售业绩统计表",
        "value": 5
      }, {
        "label": "团收支合算表",
        "value": 6
      }],
      field106Props: {
      multiple: false
    },
    tableBackgroundColor: '#ffffff', // 默认背景颜色
    showTable: false, // 是否显示表格
    tableData: [ // 初始化表格数据
      { name: '小王', age: 15 },
      { name: '小李', age: 20 }
    ]
  }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
    this.$refs['elForm'].validate(valid => {
      if (!valid) return
      // 根据选择的统计类型设置表格背景颜色
      switch (this.formData.field123) {
        case 1:
          this.tableBackgroundColor = '#ccffff'; // 财务核算表
          break;
        case 2:
          this.tableBackgroundColor = '#ccffcc'; // 销售业绩核算表
          break;
        case 3:
          this.tableBackgroundColor = '#ccccff'; // 收客人数统计表
          break;
        case 4:
          this.tableBackgroundColor = '#ffffcc'; // 签证统计表
          break;
        case 5:
          this.tableBackgroundColor = '#ccffff'; // 销售业绩统计表
          break;
        case 6:
          this.tableBackgroundColor = '#ffff99'; // 团收支合算表
          break;
        default:
          this.tableBackgroundColor = '#ffffff'; // 默认背景颜色
          break;
      }
      this.showTable = true; // 显示表格
      // TODO 提交表单
    })
  },
    resetForm() {
      this.$refs['elForm'].resetFields();
      this.showTable = false;
    },
    getField106Options() {
      // TODO 发起请求获取数据
      this.field106Options
    },
  }
}
</script>
<style scoped>
.form-container {
  /* display: flex; */
  justify-content: center; /* 水平居中 */
  height: 100vh; /* 使容器高度占满整个视口 */
}

.custom-form {
  padding-left: 100px; /* 增加表单内部的内边距 */
  padding-top: 20px;
  background-color: #f1f0f0;  /*可选：增加背景色以便观察效果 */
  /* border-radius: 8px;  可选：增加圆角
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);  可选：增加阴影  */
}
</style>
