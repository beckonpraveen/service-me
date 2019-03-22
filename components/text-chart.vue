<template>
    <div>
     <p class="mt-10 count-text">{{count}}</p>
    </div>
</template>
<style>
.count-text{
  font-size: 50px;
  padding:120px;
}

</style>
<script>
import axios from 'axios'

export default{
    props: ['data', 'options','forYear'],
    data(){
        return {

           count:''

        }
    },
    mounted() {
      var url = `http://localhost:3000/tickets/charts?name=${this.options.chartName}`;
      if(this.forYear!=null ){
         url = url + `&year=${this.forYear}`;
      }
      axios.get(url)
      .then(response => {
          this.count = response.data.data;
          console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
        this.errors.push(e)
      })
    }

}

</script>
