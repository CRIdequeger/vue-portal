<template>
  <el-row type="flex" justify="center">
    <el-col :span="12">
      <el-form ref="user" :model="user" label-position="top" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="user.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="全名">
          <el-input v-model="user.fullname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input type="email" v-model="user.email"></el-input>
        </el-form-item>
        <el-row :gutter="15">
          <el-col :span="12"><el-button type="primary" class="block" @click="update()">更新</el-button>
          </el-col>
          <el-col :span="12"><el-button type="info" class="block" @click="back()">返回</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import * as UserService from '../../service/user.service';

export default {
  name: 'updateUsers',
  props: ['id'],
  data() {
    return {
      user: {},
    };
  },
  beforeMount() {
    this.getUser();
  },
  methods: {
    getUser() {
      UserService.getUser(this.id)
        .then((res) => {
          if (res.data.success) {
            this.user = res.data.data;
          } else {
            console.log(res.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    update() {
      UserService.updateUser(this.user)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.message);
          } else {
            console.log(res.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="sass">
  .block
    width: 100%
</style>
