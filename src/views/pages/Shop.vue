<script setup>
import { ref, onMounted } from "vue";
import { useLayout } from "@/layout/composables/layout";
import { useToast } from "primevue/usetoast";
import axios from "axios";
import { useRouter } from 'vue-router';

const router = useRouter()
const { contextPath } = useLayout();
const toast = useToast();

const properties = ref(null);
const layout = ref("grid");
const sortKey = ref(null);
const sortOrder = ref(null);
const sortField = ref(null);
const productDialog = ref(null);
const product = ref({});
const orderProductDialog = ref(false);
const sortOptions = ref([
  { label: "Price High to Low", value: "!price" },
  { label: "Price Low to High", value: "price" },
]);

const confirmOrderProduct = (seeProduct) => {
  product.value = seeProduct;
  orderProductDialog.value = true;
};

const seeProduct = (seeProduct) => {
  product.value = { ...seeProduct };
  console.log(product);
  productDialog.value = true;
};

onMounted(() => {
  getAllProperties();
});

const getAllProperties = async () => {
  const data = await axios.get("/api/properties");
  properties.value = data.data;
};
const onSortChange = (event) => {
  const value = event.value.value;
  const sortValue = event.value;

  if (value.indexOf("!") === 0) {
    sortOrder.value = -1;
    sortField.value = value.substring(1, value.length);
    sortKey.value = sortValue;
  } else {
    sortOrder.value = 1;
    sortField.value = value;
    sortKey.value = sortValue;
  }
};

const formatCurrency = (value) => {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

const orderPropery = async () => {
  try {
    await axios.post("/api/orders", {
      property_id: product.value.id,
    });
    productDialog.value = false;
    orderProductDialog.value = false;
    toast.add({ severity: "success", summary: "Successful", detail: "Property ordered sucessfully! Check your Orders page for more details", life: 4000 });
  } catch (error) {
    if (error) {
      if(error.response.status = 401){
        router.push({ path: '/pages/auth/login' })
    }
      productDialog.value = false;
      orderProductDialog.value = false;
      toast.add({ severity: "error", summary: "Error Message", detail: "Something went wrong. Please try again later!", life: 3000 });
    }
  }
};

</script>
<template>
  <Toast></Toast>
  <div
    id="hero"
    class="flex flex-column pt-4 px-4 lg:px-8 overflow-hidden"
    style="background-image: url('/demo/images/landing/hero_house.jpg'); background-repeat: no-repeat; background-position: center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover"
  >
    <div class="flex justify-content-center mx-6 mt-auto md:mb-8 mb-6 pb-5 fadeindown animation-duration-1000">
      <div class="p-inputgroup" style="max-width: 600px">
        <InputText class="opacity-70 p-inputtext-lg shadow-8 rounded-5xl" placeholder="Search" />
        <span class="p-input-icon-right cursor-pointer">
          <i class="pi pi-search"></i>
        </span>
      </div>
    </div>
  </div>

  <div class="grid mx-1 md:mx-4 lg:mx-8 mt-5">
    <div class="col-12">
      <div class="card">
        <h4 class="flex justify-content-center">Shop</h4>
        <DataView :value="properties" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
          <template #header>
            <div class="grid grid-nogutter">
              <div class="col-12 text-left">
                <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)" />
              </div>
            </div>
          </template>
          <template #grid="slotProps">
            <div class="col-12 md:col-6 xl:col-4">
              <Card class="card border-1 surface-border">
                <template #header>
                  <div class="flex justify-content-center">
                    <img :src="'http://localhost/real-estate-api/storage/app/public/' + slotProps.data.image_path" class="border-round w-9 shadow-2 mt-3 mx-0" />
                  </div>
                </template>
                <template #title>
                  <div class="text-center" style="color: #45525b; font-size: 20px; font-weight: 600; letter-spacing: 1px">{{ slotProps.data.name }}</div>
                </template>
                <template #subtitle>
                  <div class="text-center uppercase mb-3" style="font-size: 13px; font-weight: 650; letter-spacing: 2px">
                    {{ slotProps.data.type}}</div>
                  <div class="text-center font-semibold text-xl">
                    <div class="flex justify-content-center">
                      {{ formatCurrency(slotProps.data.price) }}
                      <div class="ml-3 -mt-1">
                        <div v-if="slotProps.data.inventory_status">
                          <Badge value="Availaible" severity="success" size="medium"></Badge>
                        </div>
                        <div v-if="!slotProps.data.inventory_status">
                          <Badge value="Out of stock" severity="danger" size="medium"></Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template #content>
                  <div class="flex align-items-center justify-content-center">
                    <Chip class="mr-0 sm:mr-2">
                      <span class="text-md font-medium text-700 p-1"><i class="pi pi-building text-lg mr-1 my-1"></i>{{ slotProps.data.size }} m<span class="text-sm vertical-align-top">2</span></span></Chip>
                    <Chip
                      ><span class="text-md font-medium text-700 p-1"><i class="pi pi-mobile text-lg mr-1 my-1"></i>{{ slotProps.data.bedrooms_number }} bedrooms</span></Chip>
                  </div>
                </template>
                <template #footer>
                  <div class="flex justify-content-center -mt-3">
                    <Button class="bg-primary transition-duration-500 shadow-6 hover:shadow-8" icon="pi pi-info-circle" label="See More Details" @click="seeProduct(slotProps.data)" />
                  </div>
                </template>
              </Card>
            </div>
          </template>
        </DataView>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="productDialog" :breakpoints="{ '1600px': '65vw', '880px': '95vw' }" :style="{ width: '50vw' }" modal :closable="false">
    <div class="grid">
      <div class="col-12 flex align-items-center mt-5 px-5 md:px-8">
        <img :src="'http://localhost/real-estate-api/storage/app/public/' + product.image_path" alt="" class="shadow-8 w-full border-round-3xl"/>
      </div>
      <div class="col-12 mt-4">
        <div class="text-center" id="name">
          <span class="text-2xl xl:text-3xl text-800 font-semibold font-italic"> {{ product.name }} </span>
        </div>
        <div class="text-center uppercase my-3" id="type" style="font-size: 13px; font-weight: 650; letter-spacing: 2px">{{ product.type}}</div>
        <div class="flex justify-content-around mt-5 mx-3 lg:mx-7">
          <div class="flex-column" id="year">
            <i class="pi pi-calendar flex justify-content-center" style="font-size: 2.2rem"></i>
            <h5 class="font-semibold flex justify-content-center">{{ product.year }}</h5>
            <span class="text-800 text-xl">Year</span>
          </div>
          <div class="flex-column" id="size">
            <i class="pi pi-building flex justify-content-center" style="font-size: 2.2rem"></i>
            <h5 class="font-semibold flex justify-content-center">{{ product.size }} m <span class="text-sm vertical-align-top">2</span></h5>
            <span class="text-800 text-xl flex justify-content-center">Size</span>
          </div>
          <div class="flex-column" id="bedrooms_number">
            <i class="pi pi-mobile flex justify-content-center" style="font-size: 2.2rem"></i>
            <h5 class="font-semibold flex justify-content-center">{{ product.bedrooms_number }} bedrooms</h5>
            <span class="text-800 text-xl flex justify-content-center">Bedrooms</span>
          </div>
        </div>
        <div class="mx-3 md:mx-7 mt-5">
          <Divider></Divider>
          <ul class="list-none p-0 m-0 flex-column px-2">
            <li class="flex align-items-center justify-content-between mb-4">
              <div class="block text-900 text-xl font-medium mb-1">Name</div>
              <div class="mt-2 md:mt-0 flex flex-nowrap">
                <div class="block text-700 text-xl font-medium mb-1" id="name">{{ product.name }}</div>
              </div>
            </li>
            <li class="flex align-items-center justify-content-between mb-4">
              <div class="block text-900 text-xl font-medium mb-1">Type</div>
              <div class="mt-2 md:mt-0 flex flex-nowrap">
                <div class="block text-700 text-xl font-medium mb-1" id="type">{{ product.type }}</div>
              </div>
            </li>
            <li class="flex align-items-center justify-content-between mb-4">
              <div class="block text-900 text-xl font-medium mb-1">Price</div>
              <div class="mt-2 md:mt-0 flex flex-nowrap">
                <div class="block text-700 text-xl font-medium mb-1" id="price">{{ formatCurrency(product.price) }}</div>
              </div>
            </li>
            <li class="flex align-items-center justify-content-between mb-4">
              <div class="block text-900 text-xl font-medium mb-1">Address</div>
              <div class="mt-2 md:mt-0 flex flex-nowrap">
                <div class="block text-700 text-xl font-medium mb-1" id="address">{{ product.address }}</div>
              </div>
            </li>
            <li class="flex align-items-center justify-content-between mb-4">
              <div class="block text-900 text-xl font-medium mb-1">Bedrooms number</div>
              <div class="mt-2 md:mt-0 flex flex-nowrap">
                <div class="block text-700 text-xl font-medium mb-1" id="bedrooms_number">{{ product.bedrooms_number }}</div>
              </div>
            </li>
            <li class="flex align-items-center justify-content-between mb-4">
              <div class="block text-900 text-xl font-medium mb-1">Bathrooms number</div>
              <div class="mt-2 md:mt-0 flex flex-nowrap">
                <div class="block text-700 text-xl font-medium mb-1" id="bathrooms_number">{{ product.bathrooms_number }}</div>
              </div>
            </li>
            <li class="flex align-items-center justify-content-between mb-4">
              <div class="block text-900 text-xl font-medium mb-1">Year</div>
              <div class="mt-2 md:mt-0 flex flex-nowrap">
                <div class="block text-700 text-xl font-medium mb-1" id="year">{{ product.year }}</div>
              </div>
            </li>
            <li class="flex align-items-center justify-content-between mb-4">
              <div class="block text-900 text-xl font-medium mb-1">Inventory Status</div>
              <div class="mt-2 md:mt-0 flex flex-nowrap">
                <div class="block text-700 text-xl font-medium mb-1">
                  <div v-if="product.inventory_status">
                    <Badge value="In Stock" severity="success" size="large"></Badge>
                  </div>
                  <div v-if="!product.inventory_status">
                    <Badge value="Out of stock" severity="danger" size="large"></Badge>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="-mb-2 mt-2">
        <Button label="Order now!" icon="pi pi-cart-plus" class="p-button-rounded" :disabled="!product.inventory_status" @click="orderProductDialog = true" />
        <Button label="Close Dialog" icon="pi pi-times" class="p-button-outlined p-button-rounded" @click="productDialog = !productDialog" />
      </div>
    </template>
  </Dialog>

  <Dialog v-model:visible="orderProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
    <div class="flex align-items-center justify-content-center">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="product"
        >Are you sure you want to order <b> {{ product.name }} {{ product.type }} for {{ formatCurrency(product.price) }}</b>?</span>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" class="p-button-text" @click="orderProductDialog = false" />
      <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="orderPropery" />
    </template>
  </Dialog>
</template>

<style scoped>
@media screen and (min-width: 768px) {
  #hero {
    -webkit-clip-path: polygon(0 96%, 50% 100%, 100% 96%, 100% 0, 0 0);
    clip-path: polygon(0 96%, 50% 100%, 100% 96%, 100% 0, 0 0);
    height: 680px;
  }
}
@media screen and (max-width: 1300px) {
  #hero {
    height: 530px;
    -webkit-clip-path: polygon(0 96%, 50% 100%, 100% 96%, 100% 0, 0 0);
    clip-path: polygon(0 96%, 50% 100%, 100% 96%, 100% 0, 0 0);
  }
}

@media screen and (min-width: 992px) {
  #features {
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
}
</style>
