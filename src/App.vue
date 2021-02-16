<template>
  <component :is = "layout + '-layout'"/>
</template>

<script>
import {computed,} from "vue"
import {useRoute} from "vue-router"
import {useStore} from "vuex"
import MainLayout from "./layout/MainLayout"
import AuthLayout from "./layout/AuthLayout"
import AdminLayout from "./layout/AdminLayout"

export default {
  components: { MainLayout, AuthLayout, AdminLayout },
  setup() {
    const store = useStore()
    const route = useRoute()

    store.dispatch("products/getProductsFromDB")
    store.dispatch("categories/getCategoriesFromDB")

    return {
      layout: computed( () => route.meta.layout)
    }
  }
}
</script>

