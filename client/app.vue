<template>
  <div>
    <main-header />
    <!-- <to-doit /> -->
    <router-view />
    <main-footer />
  </div>
</template>
<script>
import MainHeader from './layout/header.vue'
import MainFooter from './layout/footer.jsx'
// import ToDoit from './pages/todo/todo.vue'
export default {
  name: 'App',
  components: {
    MainHeader,
    MainFooter
    // ToDoit
  }
}
</script>
