<template>

    <div v-if="loggedIn" class="bar-chart">
      <NavBar/>
      <Dashboard/>
    </div>
    <div v-else>
      Oh no 😢
    </div>
</template>

<script>
  import Dashboard from '~/components/dashboard.vue'
  import NavBar from '~/components/nav-bar.vue'
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
        NavBar
      }
  }
</script>
