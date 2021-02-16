<template>
  <div class="card">
    <catalog-filter v-model="filter"/>
    <div class="products-table">
      <catalog-item 
        v-for="item in catalog"  
        :item="item"
        :key="item.id"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import {useRoute} from 'vue-router'
import CatalogItem from '../components/catalog/CatalogItem'
import CatalogFilter from '../components/catalog/CatalogFilter'


export default {
  components: { CatalogItem, CatalogFilter },
  setup() {
    const store = useStore()
    const route = useRoute()

    const filter = ref({
      search: route.query.search
    })
    const catalog = computed( () => store.getters['products/getProducts']
    .filter(el => {
      if(filter.value.category) {
        return el.category === filter.value.category
      }
      return el
    })
    .filter( el => {
        if(filter.value.search){
          // console.log(request.fio.includes(filter.value.name) )
          return el.title.toLowerCase().includes(filter.value.search)
        }
        return el
      }) 
   )


    // watch( filter, val => console.log(val.search))

    return {
      catalog,
      filter
      }
  }
}
</script>

<style scoped>
  .card {
    border-radius: 4px;
    padding: 0;
    display: flex;
  }
</style>