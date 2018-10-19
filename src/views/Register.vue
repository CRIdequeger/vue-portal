<template>
  <div id="register">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-button type="primary" size="mini" @click="go('login')">已有账号?立刻登录!</el-button>
        <el-form ref="registerUser" :model="registerUser" label-position="top" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="registerUser.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="registerUser.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input type="password" v-model="registerUser.repassword"></el-input>
          </el-form-item>
          <el-form-item label="全名">
            <el-input v-model="registerUser.fullname"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input type="email" v-model="registerUser.email"></el-input>
          </el-form-item>
          <el-button type="primary" class="block" @click="register()">注册</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CryptoJs from 'crypto-js';
import { mapState } from 'vuex';
import * as UserService from '../service/user.service';

export default {
  name: 'Signup',
  data() {
    return {
      registerShowFlag: false,
      registerUser: {
        name: '',
        fullname: '',
        password: '',
        email: '',
      },
    };
  },
  computed: mapState({
    user: state => state.user,
  }),
  methods: {
    register() {
      const encryptPwd = this.encrypt(this.registerUser.password);
      UserService.register(Object.assign({}, this.registerUser, {
        password: encryptPwd,
      }))
        .then((res) => {
          if (res.data.success) {
            this.success(res.data);
          } else {
            console.log(res.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    encrypt(t) {
      return JSON.stringify(CryptoJs.HmacMD5(t, ''));
    },
    success(data) {
      this.$store.commit('setUser', data.data.user.fullname);
      window.localStorage.setItem('user', data.data.user.fullname);
      window.localStorage.setItem('token', data.token);
      console.log(window.localStorage.getItem('token'));
      this.$router.push('Dashboard');
    },
    go(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style scoped lang="sass">
  .block
    width: 100%
  .text-smaller
    font-size: 12px
</style>
