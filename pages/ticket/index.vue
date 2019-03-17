<template>
    <div v-if="loggedIn">
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
  export default{
      data(){
          return {
            loggedIn:this.$store.state.loginStatus == 1?true:false
          }
      },
      components: {
        Dashboard,
        NavBar
      }
  }
</script>
