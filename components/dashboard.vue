<template>
  <div>
      <Year/>
      <BarChart  :options="{ chartName:'totalByPriority', maintainAspectRatio: false, height: 200, width:400 }" />
      <PieChart  :options="{ chartName:'totalByType', maintainAspectRatio: false, height: 600, width:800 }" />
      <!--LineChart :options="{ maintainAspectRatio: false, height: 200, width:400 }" /-->
  </div>
</template>

<script>
import BarChart from '~/components/bar-chart'
import PieChart from '~/components/pie-chart'
import LineChart from '~/components/line-chart'
import Year from '~/components/year.vue'
  export default{
      data(){
        return{
        }
      },
      components: {
        PieChart,
        BarChart,
        LineChart,
        Year
      }
  }
</script>
