<template>
  <div id="app">
    <main-header />
    <!-- <to-doit /> -->
    <router-view />
    <div
      class="num"
      style="font-size:40px"
    >
      abc {{ counter }} {{ fullName }}
    </div>
    <notification content="test notify" />
    <main-footer />
  </div>
</template>
<script>
import MainHeader from './layout/header.vue'
import MainFooter from './layout/footer.jsx'
// import ToDoit from './pages/todo/todo.vue'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'App',
  metaInfo: {
    title: 'Zoinlia Mate test',
    htmlAttrs: {
      lang: 'en',
      amp: true
    },
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { vmid: 'description', name: 'description', content: 'to test meta description' }
    ]
  },
  components: {
    MainHeader,
    MainFooter
    // ToDoit
  },
  computed: {
    ...mapState({
      counter: (state) => state.count
    }),
    // count: function () {
    //   return this.$store.state.count
    // },
    ...mapGetters(['fullName'])
    // fullName: function () {
    //   return this.$store.getters.fullName
    // }
  },
  mounted: function () {
    // console.log(this.$store)
    // let i = 1
    // setInterval(() => {
    //   this.$store.commit('updateCount', i++)
    // }, 1000)
    this.updateCountAsync({
      num: 5,
      time: 2000
    })
  },
  methods: {
    ...mapActions(['updateCountAsync'])
  }
}
</script>
