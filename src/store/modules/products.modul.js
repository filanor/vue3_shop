import axios from 'axios'
import {error} from '../../utils/error'

const url = "http://localhost:3000/products"

export default {
  namespaced: true,
  state() {
    return {
      products: []
    }
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    }
  },
  actions: {
    async getProductsFromDB({commit, dispatch}) {
      try {
        const {data} = await axios.get(url)
        commit('setProducts', data)
      } catch (error) {
        dispatch('setMessage', {
          value: error(e.response.data.error.message), 
          type: 'danger'
        }, {root: true} )
        console.log(error(e.response.data.error.message))
        throw new Error()
      }
    },
    // getCardProducts(_, getters, set){
    //   const filteredSet = getters['getProductSet'](set)
    //   console.log(filteredSet)
    // }
  },
  getters: {
    getProducts(state){
      return [
        ...state.products.filter(p => p.count !== 0),
        ...state.products.filter(p => p.count === 0),
      ]
    },
    getProductById: state => id => {
      return state.products.find( el => el.id == id)
    },
    getProductSet: state => filter => state.products.filter( item => filter.includes(item.id) )

  }
}