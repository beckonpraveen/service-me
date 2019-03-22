<template>

    <div v-if="loggedIn" class="bar-chart">
      <NavBar/>
      <Dashboard/>
      <Footer/>
    </div>
    <div v-else>
      <p class="mb-6 text-center">Unauthorized! Please login!!</p>
    </div>
</template>
<style>
body{
  background: #fdfdfd;
}
</style>
<script>
  import Dashboard from '~/components/dashboard.vue'
  import NavBar from '~/components/nav-bar.vue'
  import Footer from '~/components/footer.vue'
  import axios from 'axios'
  export default{
      data(){
          return {
            loggedIn:this.$store.state.loginStatus == 1?true:false
          }
      },
      methods:{
        getRandomInt () {
          return Math.floor(Math.random() * (50 - 5 + 1)) + 5
        }
      },
      components: {
        Dashboard,
        NavBar,
        Footer
      }
  }
</script>
