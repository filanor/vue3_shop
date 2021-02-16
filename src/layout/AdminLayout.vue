<template>
  <TheAdminNavbar 
    :title="'Админ панель'"
  />
  <div class = "container with-nav">
    <router-view/>
  </div>
</template>

<script>
import TheAdminNavbar from "../components/TheAdminNavbar"
export default {
  components: {TheAdminNavbar}
}
</script>

<style lang="scss" scoped>

</style>