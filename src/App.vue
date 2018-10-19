<template>
  <div id="app">
    <el-container>
      <el-header>
        <top></top>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>
        <bottom></bottom>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Top from './components/Top';
import Bottom from './components/Bottom';

export default {
  name: 'App',
  components: {
    top: Top,
    bottom: Bottom,
  },
  created() {
    let token = window.localStorage.getItem('token');
    console.log(typeof token)
    if (token == null) return;
    const user = window.localStorage.getItem('user');
    // token = JSON.parse(token);
    if (token !== '') {
      this.$store.commit('setUser', user);
    }
  },
};
</script>

<style lang="sass">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  .el-header, .el-footer
    height: 60px
    padding-left: 30px
    line-height: 60px
    background: #409EFF
</style>
