import { Pie } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Pie,
  props: ['data', 'options'],
  data(){
    return {
      processedData:{
          labels : [],

          responsive:true,
          maintainAspectRatio:true,
          width:300,
          height:200,
          datasets: [
            {
              label: 'Ticket Count',
              data: [],
              backgroundColor: ["#FF6384","#36A2EB"]
            }
          ]
      }
    }
  },
  mounted() {
    var url = `http://localhost:3000/tickets/charts?name=${this.options.chartName}`;
    axios.get(url)
    .then(response => {
      let labels = [];
      let counts = [];

      response.data.data.forEach(function(dataPoint){
        labels.push(dataPoint._id);
        counts.push(dataPoint.count);
      });
      this.processedData.labels = labels;
      this.processedData.datasets[0].data = counts;
      this.renderChart(this.processedData, this.options);
    })
    .catch(e => {
      console.log(e);
      this.errors.push(e)
    })
  }
}
