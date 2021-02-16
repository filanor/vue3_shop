<template>
  <div class="breadcrumbs" v-if="back">
    <router-link to="/" class="text-white">Вернуться на главную</router-link>
  </div><!-- /.breadcrumbs -->
  <div class="card" :class= "{center: center}">
    <h1 class = "card-title">
      {{ title }}
      <slot name = "header"/>
    </h1>

    <slot />
  </div>
</template>

<script>
import { boolean } from 'yup/lib/locale'
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    back: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    document.title = `${props.title} | Супермагазин`
  }
}

</script>

<style lang="scss" scoped>

</style>