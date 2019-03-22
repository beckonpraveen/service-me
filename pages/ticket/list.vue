<template>
    <div v-if="loggedIn">
      <NavBar/>
      <TicketList/>
      <Footer/>
    </div>
    <div v-else>
      <p class="text-center">Unauthorized! Please login!!</p>
    </div>
</template>


<script>
import TicketList from '~/components/ticket-table.vue'
import NavBar from '~/components/nav-bar.vue'
import Footer from '~/components/footer.vue'
export default {
  data(){
    return {
      loggedIn:this.$store.state.loginStatus == 1?true:false
    }
  },
  components: {
    TicketList,
    NavBar,
    Footer
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
