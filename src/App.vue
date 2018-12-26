<template>
  <div id="app">
    <el-container>
      <el-header>
        <top></top>
      </el-header>
      <el-container>
        <el-aside width="235px">
          <sidebar></sidebar>
        </el-aside>
        <el-main id="main-container">
          <router-view/>
        </el-main>
      </el-container>
      <el-footer>
        <bottom></bottom>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Top from './components/Top';
import Bottom from './components/Bottom';
import Sidebar from './components/Sidebar';


export default {
  name: 'App',
  components: {
    Top,
    Bottom,
    Sidebar,
  },
  created() {
    let token = window.localStorage.getItem('token');
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
    position: fixed
    z-index: 5
    width: 100vw
    height: 6vh!important
    padding-left: 30px
    line-height: 6vh
    background: #409EFF
    color: #fff
  .el-header
    top: 0
  .el-footer
    bottom: 0
  #main-container
    margin: 6vh 0
    padding: 20px
    height: 88vh
    overflow: auto
</style>
