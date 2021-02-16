import { createRouter, createWebHistory } from 'vue-router'
import Shop from '../views/Shop.vue'
import Product from '../views/Product.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Shop',
    component: Shop,
    meta: {             // Произвольные поля, необходимые для работы
      layout: 'main',  // Выбираем лайаут
    },
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product,
    meta: {
      layout: 'main',
    },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'auth',
      auth: false
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: {name: 'AdminProducts'},
    component: () => import('../views/admin/Admin.vue'),
    children: [
      {
        path: 'products',
        name: 'AdminProducts', 
        component: () => import('../views/admin/AdminProducts.vue')
      },
      {
        path: 'categories',
        name: 'AdminCategories', 
        component: () => import('../views/admin/AdminCategories.vue')
      }
    ],
    meta: {
      layout: 'admin',
      auth: true
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      layout: 'main',
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})


// при переходе на страницу, проверяем, нужна ли аутентификация и  авторизован ли пользователь
router.beforeEach((to, from, next) => {
  const needAuth = to.meta.auth
  if(needAuth && store.getters['auth/isAuthenticad']){
    next()
  } else if (needAuth && !store.getters['auth/isAuthenticad']){
    next('/auth?message=auth')
  } else{
    next()
  }
})


export default router
