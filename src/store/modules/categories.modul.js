import axios from 'axios'
import {error} from '../../utils/error'

const url = "http://localhost:3000/categories"

export default {
  namespaced: true,
  state() {
    return {
      categories: []
    }
  },
  mutations: {
    setCategories(state, payload) {
      state.categories = payload
    }
  },
  actions: {
    async getCategoriesFromDB({commit, dispatch}) {
      try {
        const {data} = await axios.get(url)
        commit('setCategories', data)
      } catch (error) {
        dispatch('setMessage', {
          value: error(e.response.data.error.message), 
          type: 'danger'
        }, {root: true} )
        console.log(error(e.response.data.error.message))
        throw new Error()
      }
    },
  },
  getters: {
    categories(state){
      return state.categories
    },
    categoryName: state => type => {
      console.log('type', type)
      const category =  state.categories.find( el => el.type == type)
      return category.title
    },
  }
}