<template>
  <div>
    <b-form-select v-model="selectedYear" :options="years" class="mb-3">
        <template slot="first">
         <option :value="null"> All Year</option>
        </template>
    </b-form-select>
  </div>
</template>

<script>
  import axios from 'axios'
  export default{
    data(){
      return {
          selectedYear:'All',
          years:[]
      }
    },
    created(){
        var url = `http://localhost:3000/tickets/years`;
        axios.get(url)
        .then(response => {
          this.years = response.data.data;
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
</script>
