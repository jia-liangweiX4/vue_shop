<template>
  <div>
    <button @click="log_out">退出</button>
  </div>
</template>
<script>
export default {
  methods: {
    log_out() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
<style lang='less' scoped>
</style>
