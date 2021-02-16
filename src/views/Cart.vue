<template>
  <div class="card">
    <h1>Корзина</h1>
    <CartTable 
      v-if="isEmpty!=0"
      :products="products"
      @incriment="incrimentItem"
      @decriment="decrimentItem"
    />
    <h3 v-else class="text-center">В корзине пока ничего нет</h3>
    <hr>
    <p class="text-right"><strong>Всего: {{totalAmoutn}} руб.</strong></p>
    <p class="text-right">
      <button class="btn" @click = "getProduct">Оплатить</button>
    </p> 
  </div>
</template>

<script>
import { useStore } from "vuex"
import {computed, reactive} from "vue"
import CartTable from '../components/cart/CartTable'

const CART_MODEL = {
  '2': 3,
  '5': 1
}

export default {
  setup() {
    const store = useStore();
    const cardProducts = reactive(CART_MODEL)


    const products = computed ( ()=>{
      const set = store.getters['products/getProductSet'](Object.keys(cardProducts)) 
      return set.map(item => {
        return {qtty: cardProducts[item.id], ...item} 
      })
    })

    const isEmpty = computed( ()=> Object.keys(cardProducts).length)
    
    const totalAmoutn = computed( ()=> products.value.reduce((sum, current) => sum + current.price * cardProducts[current.id], 0))


    function incrimentItem(id) {
      cardProducts[id] += 1
    }

    function decrimentItem(id) {
      if(cardProducts[id] > 1){
        cardProducts[id] -= 1
      } else {
        delete cardProducts[id]
      }
    }


    return {
      isEmpty,
      incrimentItem,
      decrimentItem,
      products,
      totalAmoutn
    }
  },
  components: {CartTable}
}
</script>

<style scoped>

</style>