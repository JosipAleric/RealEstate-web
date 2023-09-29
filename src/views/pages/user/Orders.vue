<template>
    <div class="card border-blue-100 mx-2 md:mx-3 lg:mx-6 xl:mx-8">
      <div class="flex flex-row mb-5 justify-content-center" v-if="this.orders.orders==0"><span class="font-medium text-4xl">You don't have any orders</span></div>
      <div class="card border-blue-100 mx-0 lg:mx-4"  v-for="(order,  index) in orders.orders" :key="order">
        <div class="flex flex-column sm:flex-row sm:justify-content-between sm:align-items-center">
          <span class="text-2xl font-medium text-900">Thanks for your order!</span>
          <div class="flex mt-3 sm:mt-0">
            <div class="flex flex-column align-items-center"><span class="text-900 font-medium mb-2">Order ID</span><span class="text-700">{{order.id}}</span></div>
            <div class="flex flex-column align-items-center ml-6 md:ml-8"><span class="text-900 font-medium mb-2">Order Date</span><span class="text-700">{{formatDate(order.created_at)}}</span></div>
          </div>
        </div>
        <div class="flex flex-column md:flex-row md:align-items-center border-bottom-1 surface-border py-5">
          <img :src="'http://localhost/real-estate-api/storage/app/public/' + this.orders.properties[index].image_path" class="w-15rem flex-shrink-0 md:mr-6" />
          <div class="flex-auto mt-3 md:mt-0">
            <span class="text-xl text-900" >{{this.orders.properties[index].name}}</span>
            <div class="font-medium text-2xl text-900 mt-3 mb-5">Order {{order.order_status}}</div>
            <div class="border-round overflow-hidden surface-300 mb-3" style="height: 7px"><ProgressBar :value="order.order_status == 'Pending' ? 50 : 100" :showValue="false"></ProgressBar></div>
            <div class="flex w-full justify-content-between">
              <span class="text-900 font-medium text-xs sm:text-base">Ordered</span>
              <span class="text-900 font-medium text-xs sm:text-base">Pending</span>
              <span class="text-900 font-medium text-xs sm:text-base">{{ order.order_status == "Declined" ? 'Declined' : 'Accepted' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
        status: "",
        length: null,
        orders: [],
      };
    },
    methods: {
      getOrders() {
        axios
          .get("/api/order", {})
          .then((response) => {
            console.log(response.data)
            this.orders = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      formatDate(datum){
          datum = new Date(datum)
          return datum.toISOString().split("T")[0]
      }
    },
    mounted(){
      this.getOrders()
      console.log(this.orders)
    }
  };
  </script>