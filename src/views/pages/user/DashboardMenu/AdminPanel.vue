<template>
    <div class="surface-ground">
      <div class="flex flex-row mb-5 justify-content-center"><span class="font-medium text-4xl">Dashboard</span></div>
      <div class="grid">
        <div class="col-12 md:col-6 xl:col-3 p-3">
          <div class="p-3 text-center bg-blue-400 border-round">
            <span class="inline-flex justify-content-center align-items-center bg-blue-500 border-circle mb-3 p-3"><i class="pi pi-user text-xl text-white"></i></span>
            <div class="text-2xl font-medium text-white mb-2">{{ this.users.length }}</div>
            <span class="text-blue-100 font-medium">Users</span>
          </div>
        </div>
        <div class="col-12 md:col-6 xl:col-3 p-3">
          <div class="p-3 text-center bg-purple-500 border-round">
            <span class="inline-flex justify-content-center align-items-center bg-purple-600 border-circle mb-3 p-3"><i class="pi pi-building text-xl text-white"></i></span>
            <div class="text-2xl font-medium text-white mb-2">6</div>
            <span class="text-blue-100 font-medium">Properties</span>
          </div>
        </div>
        <div class="col-12 md:col-6 xl:col-3 p-3">
          <div class="p-3 text-center bg-indigo-500 border-round">
            <span class="inline-flex justify-content-center align-items-center bg-indigo-600 border-circle mb-3 p-3"><i class="pi pi-wallet text-xl text-white"></i></span>
            <div class="text-2xl font-medium text-white mb-2">5</div>
            <span class="text-blue-100 font-medium">Orders</span>
          </div>
        </div>
        <div class="col-12 md:col-6 xl:col-3 p-3">
          <div class="p-3 text-center bg-cyan-500 border-round">
            <span class="inline-flex justify-content-center align-items-center bg-cyan-600 border-circle mb-3 p-3"><i class="pi pi-inbox text-xl text-white"></i></span>
            <div class="text-2xl font-medium text-white mb-2">23</div>
            <span class="text-blue-100 font-medium">Messages</span>
          </div>
        </div>
      </div>
      <div class="card border-blue-100 mt-7">
        <div class="flex flex-row mb-5 justify-content-center"><span class="font-medium text-3xl">Customers</span></div>
        <DataTable
          :value="users"
          :paginator="true"
          :rows="5"
          :rowHover="true"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25, 50]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          responsiveLayout="stack" 
        >
          <template #empty> No Data found. Please try again later! </template>
          <template #loading> Loading records, please wait... </template>
          <Column field="id" header="Id" :sortable="true"></Column>
          <Column field="first_name" header="First Name" :sortable="true"> </Column>
          <Column field="last_name" header="Last Name" :sortable="true"></Column>
          <Column field="username" header="Username" :sortable="true"></Column>
          <Column field="email" header="Email" :sortable="true"></Column>
          <Column field="is_admin" header="Is Admin" :sortable="true"></Column>
          <Column field="birthday" header="Date Of Birth" :sortable="true"></Column>
          <Column header="Options">
            <template #body>
              <Button type="button" icon="pi pi-cog" class="p-button-primary"></Button>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        users: [],
      };
    },
    methods: {
      getAllUsers() {
        axios
          .get("/api/auth/users", {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            this.users = response.data;
          })
          .catch((error) => {
            console.log(error);
            if(error.response.status == 403){
              this.$router.push('/')
            }else if(error.response.status == 401){
              this.$router.push('/pages/auth/login')
            }
          });
      },
    },
  
    mounted() {
      this.getAllUsers();
    },
  };
  </script>