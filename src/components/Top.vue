<template>
  <div class="top">
    <el-row>
      <el-col :span="12">VUE-PORTAL</el-col>
      <el-col :span="12" v-if="user === null" class="top_menu">
        <el-button size="mini">登录</el-button>
      </el-col>
      <el-col :span="12"  v-if="user !== null" class="top_menu">
        <span>{{user}},你好!</span>
        <el-button size="mini" @click="test()">测试请求头</el-button>
        <el-button size="mini" @click="quit()">退出登录</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import * as UserService from '../service/user.service';

export default {
  name: 'Top',
  data() {
    return {};
  },
  computed: mapState({
    user: state => state.user,
  }),
  updated() {
    console.log(this.user);
  },
  methods: {
    test() {
      UserService.test()
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    quit() {
      this.$store.commit('setUser', null);
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('token');
      this.$router.push('login');
    },
  },
};
</script>

<style scoped lang="sass">
  .top_menu
    text-align: right
</style>
