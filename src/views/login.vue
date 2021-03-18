<template>
  <div class="wscn-http404-container">
    <van-loading type="spinner" color="#1989fa" />
  </div>
</template>

<script>
export default {
  name: 'Login',
  computed: {
    message () {
      return 'The webmaster said that you can not enter this page...'
    }
  }
}
</script>
