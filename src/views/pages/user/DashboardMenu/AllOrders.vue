<template>
    <div class="surface-ground">
      <div class="card border-blue-100 mt-7">
        <div class="flex flex-row mb-5 justify-content-center"><span class="font-medium text-3xl">Orders</span></div>
        <DataTable
          :value="orders"
          :paginator="true"
          :rows="5"
          :rowHover="true"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25, 50]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          responsiveLayout="stack"
          dataKey="id"
          v-model:selection="selectedOrder" 
        >
          <template #empty> No Data found. Please try again later! </template>
          <template #loading> Loading records, please wait... </template>
          <Column field="id" header="Order ID" :sortable="true"></Column>
          <Column field="user_id" header="User ID" :sortable="true"> </Column>
          <Column field="property_id" header="Property ID" :sortable="true"></Column>
          <Column field="order_status" header="Order Status" :sortable="true"></Column>
          <Column selectionMode="single" header="Choose This Order"></Column>
          <Column header="Options" >
            <template #body>
              <Button icon="pi pi-check" class="p-button-rounded p-button-success mr-2" @click="acceptOrder()"/>
              <Button icon="pi pi-times" class="p-button-rounded p-button-danger" @click="declineOrder()"/>
            </template>
          </Column>
          <Column header="Delete">
            <template #body>
              <Button icon="pi pi-trash" class="p-button-rounded p-button-warning p-button-outlined" @click="deleteOrder"/>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <Toast position="top-right"></Toast>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    data() {
      return {
        orders: [],
        selectedOrder: null,
      };
    },
    methods: {
      getAllOrders() {
        axios
          .get("/api/orders", {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            this.orders = response.data;
            console.log(this.orders)
          })
          .catch((error) => {
            console.log(error);
          });
      },
      acceptOrder(){
        axios.put("/api/orders/" + this.selectedOrder.id, {
          order_status: "Accepted",
        }).catch((error) => {
            console.log(error);
          });
        this.$toast.add({ severity: "success", summary: "Success Message", detail: "Order Accepted", life: 3000 });
        this.getAllOrders()
      },
      declineOrder(){
        axios.put("/api/orders/" + this.selectedOrder.id, {
          order_status: "Declined",
        }).catch((error) => {
            console.log(error);
          });
        this.$toast.add({ severity: "error", summary: "Message", detail: "Order Declined!", life: 3000 });
        this.getAllOrders()
      },
      deleteOrder(){
        axios.delete("/api/orders/" + this.selectedOrder.id, {
        }).catch((error) => {
            console.log(error);
          });
        this.$toast.add({ severity: "error", summary: "Message", detail: "Order Deleted!", life: 3000 });
        this.getAllOrders()
      }
    },
  
    mounted() {
      this.getAllOrders();
    },
  };
  </script>