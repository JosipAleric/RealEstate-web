<script setup>
import { FilterMatchMode } from "primevue/api";
import { ref, onMounted, onBeforeMount } from "vue";
import { useToast } from "primevue/usetoast";
import { useLayout } from "@/layout/composables/layout";
import axios from "axios";

const toast = useToast();
const { contextPath } = useLayout();

const products = ref([]);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const product = ref({});
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);
const image = ref();
const image_path = ref();

onBeforeMount(() => {
  initFilters();
});

onMounted(async () => {
  getAllProperties();
});
const formatCurrency = (value) => {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

const openNew = () => {
  product.value = {};
  submitted.value = false;
  productDialog.value = true;
};

const hideDialog = () => {
  productDialog.value = false;
  submitted.value = false;
};

const saveProduct = () => {
  submitted.value = true;
  if (product.value.type && product.value.type.trim() && product.value.price) {
    if (product.value.id) {
      updateProperty();
    } else {
      addProperty();
    }
    productDialog.value = false;
    product.value = {};
  }
};

const editProduct = (editProduct) => {
  product.value = { ...editProduct };
  console.log(product);
  productDialog.value = true;
};

const confirmDeleteProduct = (editProduct) => {
  product.value = editProduct;
  deleteProductDialog.value = true;
};

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };
};

const getAllProperties = async () => {
  const data = await axios.get("/api/properties");
  products.value = data.data;
};

const addProperty = async () => {
  try {
    await axios.post("/api/property", {
      name: product.value.name,
      type: product.value.type,
      address: product.value.address,
      size: product.value.size,
      bedrooms_number: product.value.bedrooms_number,
      bathrooms_number: product.value.bathrooms_number,
      price: product.value.price,
      year: product.value.year,
      image_path: image_path.value,
    }).then(response => {
      console.log(response.data)
    });;
    toast.add({ severity: "success", summary: "Successful", detail: "Product added sucessfully", life: 3000 });
    getAllProperties();
  } catch (error) {
    if (error.response.status == 422 || error.response.status == 500) {
      toast.add({ severity: "error", summary: "Error Message", detail: "Provided credidentials are incorret!", life: 3000 });
    } else {
      toast.add({ severity: "error", summary: "Error Message", detail: "Something went wrong. Please try again later!", life: 3000 });
    }
  }
};

const updateProperty = async () => {
  console.log("Product: " + product.value.inventory_status)
  try {
    await axios.put("/api/properties/" + product.value.id, {
      name: product.value.name,
      type: product.value.type,
      address: product.value.address,
      size: product.value.size,
      bedrooms_number: product.value.bedrooms_number,
      bathrooms_number: product.value.bathrooms_number,
      price: product.value.price,
      year: product.value.year,
      image_path: image_path.value,
      inventory_status: product.value.inventory_status,
    }).then(response => {
      console.log(response.data)
    });
    toast.add({ severity: "success", summary: "Successful", detail: "Product updated sucessfully", life: 3000 });
    getAllProperties();
  } catch (error) {
    if (error.response.status == 422 || error.response.status == 500) {
      toast.add({ severity: "error", summary: "Error Message", detail: "Provided credidentials are incorret!", life: 3000 });
    } else {
      toast.add({ severity: "error", summary: "Error Message", detail: "Something went wrong. Please try again later!", life: 3000 });
    }
  }
};

const deleteProperty = async () => {
  try {
    await axios.delete("/api/properties/" + product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({ severity: "success", summary: "Success Message", detail: "Property deleted succesfully!", life: 3000 });
    getAllProperties();
  } catch (error) {
    toast.add({ severity: "error", summary: "Error Message", detail: "Something went wrong. Please try again later!", life: 3000 });
  }
};

const handleUpload = (e) => {
  image.value = e.target.files[0];
  const formData = new FormData();
  formData.set("image", image.value);
  axios.post("/api/picture", formData).then((response) => {
    image_path.value = response.data;
  });
};
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <Toast />
      <Toolbar class="mb-4">
        <template v-slot:start>
          <div class="my-2 flex">
            <Button label="New" icon="pi pi-plus" class="p-button-primary mr-2" @click="openNew" />
            <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Upload" chooseLabel="Upload" class="ml-2 p-button-help" @change="handleUpload" />
          </div>
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        :value="products"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        responsiveLayout="scroll"
      >
        <template #header>
          <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 class="m-0">All Properties</h5>
            <span class="block mt-2 md:mt-0 p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['global'].value" placeholder="Search..." />
            </span>
          </div>
        </template>

        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column field="id" header="Id" :sortable="true" headerStyle="width:14%; min-width:10rem;">
          <template #body="slotProps">
            <span class="p-column-title">Id</span>
            {{ slotProps.data.id }}
          </template>
        </Column>
        <Column field="name" header="Name" :sortable="true" headerStyle="width:14%; min-width:10rem;">
          <template #body="slotProps">
            <span class="p-column-title">Name</span>
            {{ slotProps.data.name }}
          </template>
        </Column>
        <Column field="type" header="Type" :sortable="true" headerStyle="width:14%; min-width:10rem;">
          <template #body="slotProps">
            <span class="p-column-title">Type</span>
            {{ slotProps.data.type }}
          </template>
        </Column>
        <Column field="address" header="Address" :sortable="true" headerStyle="width:14%; min-width:10rem;">
          <template #body="slotProps">
            <span class="p-column-title">Address</span>
            {{ slotProps.data.address }}
          </template>
        </Column>
        <Column header="Image" headerStyle="width:14%; min-width:10rem;">
          <template #body="slotProps">
            <span class="p-column-title">Image</span>
            <img :src="'http://localhost/real-estate-api/storage/app/public/' + slotProps.data.image_path" class="shadow-2" width="100" />
          </template>
        </Column>
        <Column field="price" header="Price" :sortable="true" headerStyle="width:14%; min-width:8rem;">
          <template #body="slotProps">
            <span class="p-column-title">Price</span>
            {{ formatCurrency(slotProps.data.price) }}
          </template>
        </Column>
        <Column field="bedrooms_number" header="Bedrooms number" :sortable="true" headerStyle="width:14%; min-width:10rem;">
          <template #body="slotProps">
            <span class="p-column-title">Bedrooms number</span>
            {{ slotProps.data.bedrooms_number }}
          </template>
        </Column>
        <Column field="bathrooms_number" header="Bathrooms number" :sortable="true" headerStyle="width:14%; min-width:10rem;">
          <template #body="slotProps">
            <span class="p-column-title">Bathrooms number</span>
            {{ slotProps.data.bathrooms_number }}
          </template>
        </Column>
        <Column field="size" header="Size" :sortable="true" headerStyle="width:14%; min-width:10rem;">
          <template #body="slotProps">
            <span class="p-column-title">Size</span>
            {{ slotProps.data.size }} m2
          </template>
        </Column>
        <Column field="year" header="Year" :sortable="true" headerStyle="width:14%; min-width:10rem;">
          <template #body="slotProps">
            <span class="p-column-title">Year</span>
            {{ slotProps.data.year }}
          </template>
        </Column>
        <Column headerStyle="min-width:10rem;">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mt-2" @click="confirmDeleteProduct(slotProps.data)" />
          </template>
        </Column>
      </DataTable>

      <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Property Details" :modal="true" class="p-fluid">
        <img :src="'http://localhost/real-estate-api/storage/app/public/' + product.image_path"  v-if="product.image_path" width="150" class="mt-0 mx-auto mb-5 block shadow-2" />
        <div class="field">
          <label for="name">Name</label>
          <InputText id="name" v-model.trim="product.name" required="true" autofocus :class="{ 'p-invalid': submitted && !product.name }" />
          <small class="p-invalid" v-if="submitted && !product.name">Name is required.</small>
        </div>
        <div class="field">
          <label for="type">Type</label>
          <InputText id="type" v-model.trim="product.type" required="true" autofocus :class="{ 'p-invalid': submitted && !product.type }" />
          <small class="p-invalid" v-if="submitted && !product.type">Type is required.</small>
        </div>
        <div class="field">
          <label for="address">Address</label>
          <InputText id="address" v-model.trim="product.address" required="true" autofocus :class="{ 'p-invalid': submitted && !product.address }" />
          <small class="p-invalid" v-if="submitted && !product.address">Address is required.</small>
        </div>
        <div class="field">
          <label for="year">Year</label>
          <InputNumber id="year" v-model="product.year" :class="{ 'p-invalid': submitted && !product.year }" :required="true" mode="decimal" :useGrouping="false" />
          <small class="p-invalid" v-if="submitted && !product.year">Year is required.</small>
        </div>
        <div class="field">
          <label for="size">Size</label>
          <InputText id="size" v-model="product.size" :class="{ 'p-invalid': submitted && !product.size }" :required="true" />
          <small class="p-invalid" v-if="submitted && !product.size">Size is required.</small>
        </div>
        <div class="field">
          <label class="mb-3">Inventory Status</label>
          <div class="formgrid grid">
            <div class="field-radiobutton col-6">
              <RadioButton id="1" :value="1"  v-model="product.inventory_status"/>
              <label for="1">In Stock</label>
            </div>
            <div class="field-radiobutton col-6">
              <RadioButton id="0" :value=0  v-model="product.inventory_status"/>
              <label for="0">Out Of Stock</label>
            </div>
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col">
            <label for="bedrooms_number">Bedrooms number</label>
            <InputNumber id="bedrooms_number" v-model="product.bedrooms_number" integeronly :useGrouping="false" />
          </div>
          <div class="field col">
            <label for="bathrooms_number">Bathrooms number</label>
            <InputNumber id="bathrooms_number" v-model="product.bathrooms_number" integeronly :useGrouping="false" />
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col">
            <label for="price">Price</label>
            <InputNumber id="price" v-model="product.price" prefix="$" :class="{ 'p-invalid': submitted && !product.price }" :required="true" mode="decimal" :useGrouping="false" />
            <small class="p-invalid" v-if="submitted && !product.price">Price is required.</small>
          </div>
        </div>
        <div>
          <label for="image">Upload an image</label>
          <input type="file" id="" @change="handleUpload" class="mt-2">
        </div>
        <template #footer>
          <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
          <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
        </template>
      </Dialog>

      <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
        <div class="flex align-items-center justify-content-center">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
          <span v-if="product"
            >Are you sure you want to delete <b> {{ product.type }} located in {{ product.address }} with an ID of {{ product.id }}</b
            >?</span
          >
        </div>
        <template #footer>
          <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false" />
          <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProperty" />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<style scoped>
input[type=file]::file-selector-button {
  margin-right: 20px;
  border: none;
  background: #084cdf;
  padding: 10px 20px;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: background .2s ease-in-out;
}

input[type=file]::file-selector-button:hover {
  background: #0d45a5;
}
</style>