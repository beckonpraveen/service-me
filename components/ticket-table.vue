<template>

  <div>

    <b-nav-form>
      <b-form-select v-model="selected" :options="options" />
      <b-form-input v-model="searchvalue" size="sm" class="mr-sm-2" type="text" placeholder="Search Value"/>
      <b-button size="sm" class="my-2 my-sm-0" @click="search">Search</b-button>
    </b-nav-form>
    <b-nav-form>
      Sort By: <b-form-select @change="sortChanged" v-model="sortSelected" :options="sortOptions" />
      Order: <b-form-select @change="sortOrderChanged" v-model="sortOrderSelected" :options="sortOrders" />
    </b-nav-form>
    <b-table selectable striped hover :select-mode="selectMode" :items="items" :fields="fields" @row-selected="rowSelected"/>
    <div>
      <b-modal v-model="show" title="Ticket Detail">
        <b-container fluid class="border-0">
          <b-table striped hover :items="modalData" />
        </b-container>
      </b-modal>
    </div>
    <b-row>
         <b-col md="6" class="my-1">
             <b-pagination :total-rows="totalRows" :per-page="perPage" @change="onPageChange" v-model="currentPage" class="my-0" />
         </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from 'axios'
  export default{
    data(){
      return {
          ticketViewed:{},
          selectMode:'single',
          show: false,
          perPage: 10,
          currentPage: 1,
          totalRows:0,
          items:[],
          modalData: [],
          fields:['ticketId','createdDate','daysOpen','owner','requestor','requestorSeniority','type','category','priority','severity','satisfaction'],
          selected:"all",
          sortSelected:"createdDate",
          sortOrderSelected:"-1",
          searchvalue:'',
          options: [
            { value: 'all', text: 'Select Search Field' },
            { value: 'ticketId', text: 'TicketID' },
            { value: 'category', text: 'Category' },
            { value: 'severity', text: 'Severity' },
            { value: 'priority', text: 'Priority' },
            { value: 'type', text: 'Type' }
          ],
          sortOptions: [
            { value: 'createdDate', text: 'Created Date' },
            { value: 'ticketId', text: 'TicketID' },
            { value: 'category', text: 'Category' },
            { value: 'severity', text: 'Severity' },
            { value: 'priority', text: 'Priority' },
            { value: 'type', text: 'Type' }

          ],
          sortOrders:[
            { value: '1', text: 'Ascending' },
            { value: '-1', text: 'Descending' }
          ]
      }
    },
    created(){
        this.populateTicketList();
    },
    methods:{
        populateTicketList(){

            var url = `http://localhost:3000/tickets/list?&page=${this.currentPage}&limit=10&sort=${this.sortSelected}:${this.sortOrderSelected}`;
            if(this.searchvalue!=''){
               url = url+`&search=${this.selected}:${this.searchvalue}`
            }
            axios.get(url)
            .then(response => {
              this.items = response.data.data.docs
              this.totalRows = response.data.data.totalDocs;
            })
            .catch(e => {
              this.errors.push(e)
            })
        },
        onPageChange(pageNum){

            this.currentPage = pageNum;
            this.populateTicketList();
        },
        sortChanged(){

            this.populateTicketList();
        },
        sortOrderChanged(){

            this.populateTicketList();
        },
        search(){

            this.populateTicketList();
        },
        rowSelected(data){

          if(data){
            let tableData = [];
            let ticket = data[0];
            for (var key in ticket){
                var field = {};
                field['name'] = key;
                field['value'] = ticket[key];
                tableData.push(field);
            }
            this.show=true;
            this.modalData = tableData;
          }
        }
    }
  }
</script>
