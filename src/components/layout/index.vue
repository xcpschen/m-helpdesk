<template>
    <section class="layout">
        <section class="app-main">
            <router-view :key="key"></router-view>
        </section>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o" to="home">首页</van-tabbar-item>
            <van-tabbar-item icon="notes-o" to="list/all">工单</van-tabbar-item>
            <!-- <van-tabbar-item icon="manager-o">个人中心</van-tabbar-item> -->
        </van-tabbar>
    </section>

</template>
<script>
export default {
  name: 'Layout',
  computed: {
    key () {
      return this.$route.path
    }
  },
  data () {
    return {
      active: 0,
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style>
 .layout,.app-main{
     width: 100%;
     height:100%
 }
</style>
