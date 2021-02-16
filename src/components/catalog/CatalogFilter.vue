<template>
  <div class="products-filter">
    <div class="form-control">
      <input type="text" placeholder="Найти товар..." v-model="search">
      <span class="form-control-clear" @click="search=''">&times;</span>
    </div>

    <ul class="list">
      <li class="list-item" @click="category=null">Все</li>
      <li class="list-item" v-for ="cat in categories" :key="cat.id" @click="filterByCategory(cat.type)">
        {{cat.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {computed, watch, ref} from 'vue'
export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup({modelValue}, {emit}) {
    const store = useStore()
    const router = useRouter()
    
    const search = ref(modelValue.search)
    const category = ref(modelValue.category)
    
    function filterByCategory(newCat) {
      category.value = newCat
    }

    watch( [search, category], ([sval, cval]) => {
      if( sval && cval){
        router.replace({query: {search: sval, category: cval}})
      } else if (sval) {
        router.replace({query: {search: sval}})
      } else {
        router.replace({query: { category: cval}})
      }
      emit('update:modelValue', {
        search: sval,
        category: cval
      })
    })

    const categories = computed( () => store.getters['categories/categories'])

    return {
      categories,
      search,
      category,
      filterByCategory
    }
    
  }
  
}
</script>

<style lang="scss" scoped>

</style>