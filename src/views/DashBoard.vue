<template>
  <div class="dashboard">
    <el-row>
      <el-col :span="24">
        <tree-grid></tree-grid>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <smart-form :formMetaData="formMetaData" @submit="submitSmartForm"></smart-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <user-list :data="userList" @reload="getUserList"></user-list>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card>
          <currency-chart></currency-chart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as UserService from '../service/user.service';
import UserList from '../components/user/list.user';
import TreeGrid from '../components/treeGrid/TreeGrid';
import SmartForm from '../components/form/smartForm';
import CurrencyChart from '../components/currency/chart.currency';

export default {
  name: 'Dashboard',
  data() {
    return {
      userList: [],
      formMetaData: {
        form: {
          name: '聪明的表单',
          /* 120px */
          labelWidth: '130px',
          /* left, right, top */
          labelPosition: 'right',
          /* 有几列 */
          col: 2
        },
        inputs: [
          {
            key: '001',
            label: '测试input',
            name: 'testInput',
            type: 'input',
            validators: [
              { required: true, message: '请输入文字', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
          },
          {
            key: '002',
            label: '测试radio',
            name: 'testRadio',
            type: 'radio',
            options: [
              {
                text: '测试一',
                value: 0,
                disabled: true,
              },
              {
                text: '测试二',
                value: 1
              },
              {
                text: '测试三',
                value: 2
              }
            ],
            validators: [
              { required: true, message: '请选择一项', trigger: 'change' }
            ]
          },
          {
            key: '003',
            label: '测试checkbox',
            name: 'testCheckbox',
            type: 'checkbox',
            options: [
              {
                text: '测试一',
                value: 0,
                disabled: true,
              },
              {
                text: '测试二',
                value: 1
              },
              {
                text: '测试三',
                value: 2
              }
            ],
            validators: [
              { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ]
          },
          {
            key: '004',
            label: '测试select',
            name: 'testSelect',
            type: 'select',
            // disabled: true,
            options: [
              {
                text: '测试一',
                value: 0,
                disabled: true,
              },
              {
                text: '测试二',
                value: 1
              },
              {
                text: '测试三',
                value: 2
              }
            ],
            validators: [
              { required: true, message: '请选择', trigger: 'change' }
            ]
          },
          {
            key: '005',
            label: '测试datetime',
            name: 'testDatetime',
            type: 'datetime',
            disabled: true,
            /*validators: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ]*/
          },
          {
            key: '006',
            label: '测试时间范围',
            name: 'testDatetimeRange',
            type: 'datetimerange',
            validators: [
              {
                required: true, message: '请选择时间范围', trigger: 'blur'
              },
              {
                validator: (rule, value, callback) => {
                  callback()
                },
                trigger: 'blur'
              }
            ]
          },
          {
            key: '007',
            label: '测试upload',
            name: 'testUpload',
            disabled: true,
            type: 'upload',
            /* 文件提交地址 */
            action: 'https://jsonplaceholder.typicode.com/posts/'
          },
          {
            key: '008',
            label: '测试textarea',
            name: 'testTextarea',
            disabled: true,
            type: 'textarea',
            /*validators: [
              { required: true, message: '请输入描述', trigger: 'blur' }
            ]*/
          },
          {
            key: '009',
            label: '测试number',
            name: 'testNumber',
            disabled: true,
            type: 'number',
            precision: 2,
            validators: [
              { required: true, message: '请输入数字', trigger: 'blur' }
            ]
          },
        ]
      },
    };
  },
  components: {
    userList: UserList,
    currencyChart: CurrencyChart,
    treeGrid: TreeGrid,
    SmartForm
  },
  mounted() {
  },
  methods: {
    getUserList(pager) {
      let { pageSize, pageNumber } = pager;
      UserService.getUserList({
        user: {
          email: '',
          name: ''
        },
        pageSize,
        pageNumber
      })
        .then((res) => {
          this.userList = res.data;
          console.log(this.userList);
        });
    },
    submitSmartForm(form) {
      console.log(form)
    }
  },
};
</script>

<style scoped lang="sass">
  .card-margin
    margin-top: 20px
  .el-row
    margin-bottom: 20px
    &:last-child
      margin-bottom: 0
</style>

