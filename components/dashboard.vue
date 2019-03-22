<template>
  <div>
      <b-container >
        <b-row class="mt-2">
          <b-col lg="12" class="mt-3">
            <b-nav-form class="float-left">
              <b-input-group prepend="Year">
                <b-form-select v-model="selectedYear" @change="refreshCharts" :options="years" >
                    <template slot="first">
                     <option :value='null'> All Year</option>
                    </template>
                </b-form-select>
              </b-input-group>
            </b-nav-form>
          </b-col>
          <b-col sm="12" lg="6" class="mt-4">
            <b-card class="p-2 mb-2 text-card">
              <h4 class="text-left">Number of Open Tickets</h4>
              <TextChart  :forYear="selectedYear" :key="openChartState" :options="{ chartName:'totalOpen', color:'#cc3300', maintainAspectRatio: false, height: 200, width:400 }" />
            </b-card>
          </b-col>
          <b-col sm="12" lg="6" class="mt-4">
            <b-card class="p-2">
              <h4 class="text-left">Total Tickets By Satisfaction</h4>
              <PieChart  :forYear="selectedYear" :key="satisfactionChartState" :options="{ chartName:'totalBySatisfaction', color:['#ff9999','#33cccc','#9966ff','#0099cc'], maintainAspectRatio: false, height: 600, width:800 }" />
            </b-card>
          </b-col>
          <b-col sm="12" lg="6" class="mt-4">
            <b-card class="p-2">
              <h4 class="text-left">Total Tickets By Issue Type</h4>
              <PieChart  :forYear="selectedYear" :key="typeChartState" :options="{ chartName:'totalByType', color:['#003366','#cc33ff'], maintainAspectRatio: false, height: 600, width:800 }" />
            </b-card>
          </b-col>
          <b-col sm="12" lg="6" class="mt-4">
            <b-card class="p-2">
              <h4 class="text-left">Total Tickets By Priority</h4>
              <BarChart  :forYear="selectedYear" :key="priorityChartState" :options="{ chartName:'totalByPriority', color:'#996600', maintainAspectRatio: false, height: 600, width:800}" />
            </b-card>
          </b-col>
          <b-col sm="12" lg="6" class="mt-4">
            <b-card class="p-2">
              <h4 class="text-left">Total Tickets By Category</h4>
              <BarChart  :forYear="selectedYear" :key="categoryChartState" :options="{ color:'#006600', chartName:'totalByCategory', maintainAspectRatio: false, height: 200, width:400 }" />
            </b-card>
          </b-col>
          <b-col sm="12" lg="6" class="mt-4">
            <b-card class="p-2 mb-2">
              <h4 class="text-left">Tickets Volume Per Year</h4>
              <LineChart  :options="{ chartName:'totalByYear', color:'#cc3300', label:'Tickets count', maintainAspectRatio: false, height: 200, width:400 }" />
            </b-card>
          </b-col>
        </b-row>
      </b-container>

  </div>
</template>
<style>
  .input-group-text{
    background-color:rgb(79, 145, 205);
    color:white
  }
  .card.text-card{
    min-height: 500px;
    max-height: 500px
  }

  @media only screen and (max-width: 600px){
    .card.text-card{
      min-height: 400px;
      max-height: 400px
    }
    .text-card .count-text{
      font-size: 30px;
    }
  }
</style>
<script>
import BarChart from '~/components/bar-chart'
import PieChart from '~/components/pie-chart'
import LineChart from '~/components/line-chart'
import TextChart from '~/components/text-chart'
import axios from 'axios'
  export default{
      data(){
        return{
           selectedYear:null,
           years:[],
           priorityChartState:this.selectedYear,
           categoryChartState:this.selectedYear,
           typeChartState:this.selectedYear,
           openChartState:this.selectedYear,
           satisfactionChartState:this.selectedYear
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
      },
      components: {
        PieChart,
        BarChart,
        LineChart,
        TextChart
      },
      methods:{
          refreshCharts(){
            this.priorityChartState = "priority:"+this.selectedYear;
            this.typeChartState = "type:"+this.selectedYear;
            this.severityChartState = "severity"+this.selectedYear;
            this.categoryChartState = "category"+this.categoryChartState;
            this.openChartState = "open"+this.openChartState;
            this.satisfactionChartState = "satis"+this.satisfactionChartState;
          }
      }
  }
</script>
