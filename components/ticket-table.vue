<template>
  <div>
    <b-table selectable striped hover :select-mode="selectMode" :items="items" :fields="fields" @row-selected="rowSelected" @sort-changed="sortChanged"/>
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
          sortBy:'',
          sortOrder:'',
          fields:[
              {
                key:'ticketId',
                sortable:true
              },
              {
                key:'createdDate',
                sortable:true
              },
              {
                key:'daysOpen',
                sortable:true
              },
              {
                key:'owner',
                sortable:false
              },
              {
                key:'requestor',
                sortable:false
              },
              {
                key:'requestorSeniority',
                sortable:true
              },
              {
                key:'type',
                sortable:true
              },
              {
                key:'category',
                sortable:true
              },
              {
                key:'priority',
                sortable:true
              },
              {
                key:'severity',
                sortable:true
              },
              {
                key:'satisfaction',
                sortable:true
              }
          ]
      }
    },
    created(){
        axios.get(`http://localhost:3000/tickets/list?page=1&limit=10`)
        .then(response => {
          this.items = response.data.data.docs
          this.totalRows = response.data.data.totalDocs;
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    methods:{
        onPageChange(pageNum){
            axios.get(`http://localhost:3000/tickets/list?page=${pageNum}&limit=10`)
            .then(response => {
              this.items = response.data.data.docs
              this.totalRows = response.data.data.totalDocs;
              this.currentPage = pageNum;
            })
            .catch(e => {
              this.errors.push(e)
            })
        },
        sortChanged(sortConfig){
            let order = sortConfig.sortDesc=="false"?-1:1
            var url = `http://localhost:3000/tickets/list?page=${this.currentPage}&limit=10&sortBy=${sortConfig.sortBy}&sortOrder=${order}`;
            axios.get(url)
            .then(response => {
              this.items = response.data.data.docs
              this.totalRows = response.data.data.totalDocs;
            })
            .catch(e => {
              this.errors.push(e)
            })
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
