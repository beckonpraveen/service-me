<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">ServiceMe</b-navbar-brand>

    <b-navbar-toggle target="nav_collapse" />

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item :to="{path:'/ticket'}">Dashboard</b-nav-item>
        <b-nav-item :to="{path:'/ticket/list'}">List</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <!--Search/-->
        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content"><em>{{userName}}</em></template>
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
  import Search from '~/components/search.vue'
  export default{
      data(){
          return{
            userName:this.$store.state.userName
          }
      },
      components:{
        Search
      },
      methods:{
          logout(){
              this.$router.push({path:'/'})
              this.$store.commit('logout');
          }
      }
  }

</script>
