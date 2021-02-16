<template>
  <div v-if="message" :class = "['alert', message.type]">
    <p class="alert-title">{{title}}</p><!-- /.alert-title -->
    <p>{{ message.value }}</p>
    <span class="alert-close" @click="close">&times;</span><!-- /.alert-close -->


  </div>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'

export default {
  setup() {
    const store = useStore();  

    const TITLE_MAP ={
      primary: 'Успех!',
      danger: 'Ошибка!',
      warning: 'Внимание!'
    }

    const message = computed(() => store.state.message)
    const title = computed( () => message ? TITLE_MAP[message.value.type] : '')

    return {
      message,
      title, 
      close: () => store.commit('clearMessage')
    }
  }
  
}
</script>

<style lang="scss" scoped>

</style>