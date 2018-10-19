<template>
    <div class="user-list">
      <el-row class="caption">
        <el-col :span="12">用户列表</el-col>
        <el-col :span="12" class="action">
          <el-button type="primary" size="small" :disabled="selectedRow.length != 1" @click="updateUser()">修改</el-button>
          <el-button type="danger" size="small" :disabled="selectedRow.length == 0" @click="deleteUser()">删除</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="userList"
        border
        style="width: 100%"
        ref="userList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="fullname"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="create"
          label="创建日期">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.create | originalDate }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
import * as UserService from '../../service/user.service';

export default {
  name: 'UserList',
  props: ['userList'],
  data() {
    return {
      selectedRow: [],
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.selectedRow = val;
    },
    updateUser() {
      this.$router.push({ path: `/user/${this.selectedRow[0]._id}/update`});
    },
    deleteUser() {
      UserService.deleteUser(this.selectedRow)
        .then((res) => {
          if (res.data.success) {
            console.log('暴露接口,外部实现');
            this.$emit('reload');
          } else {
            console.log(res.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped lang="sass">
  .action
    text-align: right
    margin-bottom: 1rem
</style>
