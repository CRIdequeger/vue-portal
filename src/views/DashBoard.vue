<template>
  <div class="dashboard">
    <el-row>
      <el-col :span="24">
        <tree-grid></tree-grid>
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
import CurrencyChart from '../components/currency/chart.currency';

export default {
  name: 'Dashboard',
  data() {
    return {
      userList: [],
    };
  },
  components: {
    userList: UserList,
    currencyChart: CurrencyChart,
    treeGrid: TreeGrid
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

