import { Bar } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Bar,
  props: ['data', 'options'],
  data(){
      return {
          processedData : {
              labels:[],
              datasets:[
                {
                  label: 'Ticket Count',
                  backgroundColor: '#f87979',
                  pointBackgroundColor: 'white',
                  borderWidth: 1,
                  pointBorderColor: '#249EBF',
                  data: []
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
