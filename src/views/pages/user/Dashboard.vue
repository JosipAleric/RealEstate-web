<script setup>
import { ref } from 'vue'
import AdminPanel from "./DashboardMenu/AdminPanel.vue";
import Properties from "./DashboardMenu/Properties.vue";
import Users from "./DashboardMenu/Users.vue";
import AllOrders from "./DashboardMenu/AllOrders.vue";
const active = ref(0);
const items = [
        { label: "Dashboard", icon: "pi pi-fw pi-home" },
        { label: "Properties", icon: "pi pi-fw pi-building" },
        { label: "Users", icon: "pi pi-fw pi-user" },
        { label: "Orders", icon: "pi pi-fw pi-wallet" },
      ];
</script>

<template>
  <div class="m-2 md:m-5">
    <div class="card border-blue-100">
      <TabMenu :model="items" v-model:activeIndex="active" class="dark-panel"/>
      <div class="mt-5 mx-0 md:mx-3 lg:mx-5">
        <AdminPanel v-if="active == 0"></AdminPanel>
        <Properties v-if="active == 1"></Properties>
        <Users v-if="active == 2"></Users>
        <AllOrders v-if="active == 3"></AllOrders>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">

// ::v-deep(.dark-panel.p-tabmenu) {
//   .p-menuitem-link{
//         margin: 0 0 0 0 !important
//     }

// }
</style>