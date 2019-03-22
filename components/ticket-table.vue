<template>
  <div>
    <b-container fluid>
      <b-row style="background:#f6f6f6">
          <div class="p-2 pb-2 pr-3 pl-3">
            <b-row>
              <b-col sm="12" lg="6" class="mt-1 mb-1 float-right">
                <b-nav-form class="mt-0">
                  <b-input-group prepend="Sort By" class="sort-text">
                      <b-form-select class="sort-by" @change="sortChanged" v-model="sortSelected" :options="sortOptions" />
                      <b-form-select @change="sortOrderChanged" v-model="sortOrderSelected" :options="sortOrders" />
                  </b-input-group>
                </b-nav-form>
              </b-col>
              <b-col sm="12" lg="6" class="mt-1 mb-1">
                <b-nav-form class="mt-0">
                  <b-input-group class="">
                    <b-form-select v-model="selected" :options="options" />
                    <b-input-group-append>
                      <b-form-input v-model="searchvalue" type="text" placeholder="Search Value"/>
                      <b-button @click="search" variant="info">Search</b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-nav-form>
              </b-col>
            </b-row>
          </div>
      </b-row>
      <b-row class="mt-3">
        <b-col>
          <b-card>
            <b-table selectable striped hover responsive :select-mode="selectMode" :items="items" :fields="fields" @row-selected="rowSelected"/>
            <p v-if="showNoRecords" class="text-center">No records found! Refine your search.</p>
          </b-card>
        </b-col>
      </b-row>
      <div>
        <b-modal v-model="show" hide-footer size="lg" centered title="Ticket Detail">
          <b-container fluid class="border-0">
            <b-table striped hover :items="modalData" />
          </b-container>
        </b-modal>
      </div>
      <b-row class="mt-1">
         <b-col lg="12" md="6" class="my-1">
             <b-pagination :total-rows="totalRows" :per-page="perPage" @change="onPageChange" v-model="currentPage" align="right" class="my-0" />
         </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<style>
.btn-info, .btn-info:hover{
  background: rgb(79, 145, 205);
}
</style>
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
          showNoRecords:false,
          options: [
            { value: 'all', text: 'Select Search Field' },
            { value: 'ticketId', text: 'ID' },
            { value: 'category', text: 'Category' },
            { value: 'severity', text: 'Severity' },
            { value: 'priority', text: 'Priority' },
            { value: 'type', text: 'Type' }
          ],
          sortOptions: [
            { value: 'createdDate', text: 'Date' },
            { value: 'ticketId', text: 'ID'},
            { value: 'category', text: 'Category' },
            { value: 'severity', text: 'Severity' },
            { value: 'priority', text: 'Priority' },
            { value: 'type', text: 'Type' }

          ],
          sortOrders:[
            { value: '1', text: 'Asc' },
            { value: '-1', text: 'Desc' }
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
              if(this.totalRows == 0){
                this.showNoRecords = true;
              }
              else{
                this.showNoRecords = false;
              }
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
<style>

  .sort-by{
    width:150px;
  }
  .page-item.active .page-link{
    background-color:rgb(79, 145, 205);
    border-color:rgb(79, 145, 205);
  }
  .sort-text .input-group-text{
    background-color:rgb(79, 145, 205);
    color:white
  }


</style>
