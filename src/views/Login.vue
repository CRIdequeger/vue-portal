<template>
  <div id="login">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-button type="warning" size="mini" @click="go('register')">还没有账号?注册一个!</el-button>
        <el-form ref="loginUser" :model="loginUser" label-position="top" label-width="80px" autocomplete="false">
          <el-form-item label="用户名">
            <el-input v-model="loginUser.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="loginUser.password"></el-input>
          </el-form-item>
          <el-button type="primary" class="block" @click="login()">登录</el-button>
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
  name: 'Login',
  data() {
    return {
      loginUser: {},
    };
  },
  computed: mapState({
    user: state => state.user,
  }),
  methods: {
    login() {
      const encryptPwd = this.encrypt(this.loginUser.password);
      UserService.login({
        name: this.loginUser.name,
        password: encryptPwd,
      })
        .then((res) => {
          const data = res.data;
          if (data.success) {
            this.success(data);
          } else {
            console.log(data.message);
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
      this.$store.commit('setUser', data.data.user.name);
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('user', data.data.user.name);
      if (this.$route.query.redirect) {
        this.$router.push({
          path: this.$route.query.redirect,
        });
      } else {
        this.$router.push('Dashboard');
      }
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
