<template>
  <nav class="navbar">
    <h3>{{ title }}</h3>

    <ul class="navbar-menu">
      <li>
        <router-link :to="{name: 'AdminProducts'}">Продукты</router-link>
      </li>
      <li>
        <router-link :to="{name: 'AdminCategories'}">Категории</router-link>
      </li>
    </ul><!-- /.navbar-menu -->
  </nav><!-- /.navbar -->
</template>

<script>


export default {
  props: ['title', 'links'],
  setup (props) {
    
  
    return {
      title: props.title,
    }
  }
}
</script>


