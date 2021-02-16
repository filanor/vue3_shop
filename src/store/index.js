import { createStore, createLogger } from 'vuex'
import auth from './modules/auth.modul'
import products from './modules/products.modul'
import categories from './modules/categories.modul'

const plugins = []

if(process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default createStore({
  plugins,
  state() {
    return {
      message: null
    }
  },
  mutations: {
    setMessaage(state, message){
      state.message = message
    },
    clearMessage(state) {
      state.message = null
    }
  },
  actions: {
    setMessage(state, message) {
      state.commit('setMessaage', message)
      setTimeout(()=>{
        state.commit('clearMessage')
      }, 5000)
    }
  },
  modules: {
    auth, products, categories
  }
})
