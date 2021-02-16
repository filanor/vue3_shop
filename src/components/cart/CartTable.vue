<template>
  <table class="table">
    <thead>
    <tr>
      <th>Наименование</th>
      <th>Количество</th>
      <th>Цена (шт)</th>
      <th>Итого</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="prod in products" :key="prod.id">
      <td>{{prod.title}}</td>
      <td>
        <button 
          class="btn primary" 
          :disabled="prod.qtty >= prod.count" 
          @click.prevent="$emit('incriment', prod.id)"
        >+</button>
          {{prod.qtty}} шт.
        <button 
          class="btn danger" 
          @click.prevent="$emit('decriment', prod.id)"
        >-</button>
      </td>
      <td>{{prod.price}} руб.</td>
      <td>{{prod.price * prod.qtty}} руб</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    emits: ['incriment', 'decriment'],
    props: ['products'],
    state(props) {
      return {
        products: props.products
      }
    }
    
  }
</script>