<!--
  Аутентификация с помощью библиотек:
  - Vee Validate (npm install vee-validate@next --save)
  - Yup (npm install yup)
-->

<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Войти в систему</h1>

    <div :class="['form-control', {invalid: eError}]">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email"  @blur="eBlur">
      <small v-if="eError">{{ eError }}</small>
    </div><!-- /.form-control -->

    <div :class="['form-control', {invalid: eError}]">
      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="password" @blur="pBlur">
      <small v-if="pError">{{ pError }}</small>
    </div><!-- /.form-control -->

    <button class="btn primary" type="submit" :disabled = "isTooManyAttemps || isSubmitting">Войти</button><!-- /.btn primary -->
    <div>
      <span class="text-danger" v-if="isTooManyAttemps">Много попыток войти в систему</span><!-- /.text-danger -->
    </div>
  </form>
</template>

<script>

import {useLoginForm} from "../use/login-form"
import {error} from '../utils/error'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'

export default {
  setup(){
    const store = useStore()
    const route = useRoute()

    if(route.query.message){
      store.dispatch('setMessage', {
        value: error(route.query.message),
        type: 'warning'
      })
    }
    return {...useLoginForm()}
  }
}
</script>

<style lang="scss" scoped>

</style>