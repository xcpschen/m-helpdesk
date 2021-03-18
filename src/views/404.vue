<template>
  <div class="wscn-http404-container">
    <van-empty image="error" description="404 :(" />
  </div>
</template>

<script>
export default {
  name: 'Page404',
  computed: {
    message () {
      return 'The webmaster said that you can not enter this page...'
    }
  }
}
</script>
