<template>
<div>
  <b-navbar toggleable="lg" type="dark" style="background:rgb(79, 145, 205)">
    <b-navbar-brand class="font-weight-bold" href="#"><i>ServiceMe</i></b-navbar-brand>

    <b-navbar-toggle target="nav_collapse" />

    <b-collapse is-nav id="nav_collapse">
       <b-nav class="menu">
        <b-nav-item  :to="{path:'/ticket'}">Dashboard</b-nav-item>
        <b-nav-item  :to="{path:'/ticket/list'}">Tickets</b-nav-item>
      </b-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content"><em class="user-name">{{userName}}</em></template>
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<style>

  .menu a, .user-name {
    color:#ffffff
  }

</style>

<script>
  import Search from '~/components/search.vue'
  export default{
      data(){
          return{
            isDashActive:true,
            isListActive:false,
            userName:this.$store.state.userName
          }
      },
      components:{
        Search
      },
      methods:{
          logout(){
              this.$router.go();
              this.$router.push({path:'/'})
              this.$store.commit('logout');
          },
          dashClicked(){
              this.isDashActive = true;
              this.isListActive = false;
          },
          listClicked(){
              this.isDashActive = false;
              this.isListActive = true;
          }
      }
  }

</script>
