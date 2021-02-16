<template>
  <app-page back center :title="item.title" v-if="item">
    <img :src="item.img" />
    <p>Категория: <strong>{{ category }}</strong></p>
    <button class="btn">
      {{currency(item.price)}}
    </button>
    <div class="product-controls in-card">
      <button class="btn danger">-</button>
      <strong>12</strong>
      <button class="btn primary">+</button>
    </div>
  </app-page>
  <h3 class="text-center text-white" v-else>
    Товара не найден.
  </h3>
  <pre>{{item}}</pre>
</template>

<script>
import AppPage from '../components/ui/AppPage'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {computed } from 'vue'
import {currency} from '../utils/currency'
export default {
  components: {AppPage},
  setup() {
    const router = useRoute()
    const store = useStore()

    const item = computed( () => store.getters['products/getProductById'](router.params.id) )
    const category = computed( () => store.getters['categories/categoryName'](item.value.category))

    return {
      item,
      currency, 
      category
    }
  }
}
</script>

<style scoped>

</style>