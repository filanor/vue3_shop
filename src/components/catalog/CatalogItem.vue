<template>
  <router-link :to="{name: 'Product', params: {id: item.id}}">
  <div class="product-card">
    <div class="product-img">
      <img :src="item.img">
    </div>
    <h4 class="product-title">{{ item.title }}</h4>
    <div class="text-center">
      <button class="btn" v-if="item.count>0">{{ currency(item.price) }}</button>
      <span v-else>нет в наличии</span>
      <!--          <div class="product-controls">-->
      <!--            <button class="btn danger">-</button>-->
      <!--            <strong>123</strong>-->
      <!--            <button class="btn primary">+</button>-->
      <!--          </div>-->
    </div>
  </div>
  </router-link>
</template>

<script>
import {currency} from '../../utils/currency'
export default {
  props: ['item'],
  setup() {
    return {
      currency
    }
  }
  
}
</script>