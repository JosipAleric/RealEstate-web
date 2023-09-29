<script setup>
import { FilterMatchMode } from "primevue/api";
import { ref, onMounted, onBeforeMount } from "vue";
import { useToast } from "primevue/usetoast";

import axios from "axios";

const toast = useToast();

const users = ref([]);
const userDialog = ref(false);
const deleteuserDialog = ref(false);
const user = ref({});
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);

onBeforeMount(() => {
  initFilters();
});

onMounted(async () => {
  getAllUsers();
});

const openNew = () => {
  user.value = {};
  submitted.value = false;
  userDialog.value = true;
};

const hideDialog = () => {
  userDialog.value = false;
  submitted.value = false;
};

const saveuser = () => {
  submitted.value = true;
  if (user.value.first_name && user.value.first_name.trim() && user.value.last_name) {
    if (user.value.id) {
      updateUser();
    } else {
      addUser();
    }
    userDialog.value = false;
    user.value = {};
  }
};

const edituser = (edituser) => {
  user.value = { ...edituser };
  console.log(user);
  userDialog.value = true;
};

const confirmDeleteuser = (edituser) => {
  user.value = edituser;
  deleteuserDialog.value = true;
};

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };
};

const getAllUsers = async () => {
  const data = await axios.get("/api/auth/users");
  users.value = data.data;
  console.log(users.value);
};

const addUser = async () => {
  try {
    await axios.post("/api/auth/register", {
      email: user.value.email,
      password: user.value.password,
      first_name: user.value.first_name,
      last_name: user.value.last_name,
      username: user.value.username,
      birthday: user.value.birthday,
      password_confirmation: user.value.password_confirmation,
      is_admin: user.value.is_admin
    });
    toast.add({ severity: "success", summary: "Successful", detail: "User added sucessfully", life: 3000 });
    getAllUsers();
  } catch (error) {
    if (error.response.status == 422 || error.response.status == 500) {
      toast.add({ severity: "error", summary: "Error Message", detail: "Provided credidentials are incorret!", life: 3000 });
    } else {
      toast.add({ severity: "error", summary: "Error Message", detail: "Something went wrong. Please try again later!", life: 3000 });
    }
  }
};

const updateUser = async () => {
  try {
    await axios.put("/api/auth/users/" + user.value.id, {
      email: user.value.email,
      first_name: user.value.first_name,
      last_name: user.value.last_name,
      username: user.value.username,
      birthday: user.value.birthday,
      is_admin: user.value.is_admin
    });
    toast.add({ severity: "success", summary: "Successful", detail: "User updated sucessfully", life: 3000 });
    getAllUsers();
  } catch (error) {
    if (error.response.status == 422 || error.response.status == 500) {
      toast.add({ severity: "error", summary: "Error Message", detail: "Provided credidentials are incorret!", life: 3000 });
    } else {
      toast.add({ severity: "error", summary: "Error Message", detail: "Something went wrong. Please try again later!", life: 3000 });
    }
  }
};

const deleteUser = async () => {
  try {
    await axios.delete("/api/auth/users/" + user.value.id, {withCredentials: false});
    deleteuserDialog.value = false;
    user.value = {};
    toast.add({ severity: "success", summary: "Success Message", detail: "User deleted sucesfully!", life: 3000 });
    getAllUsers();
  } catch (error) {
    toast.add({ severity: "error", summary: "Error Message", detail: "Something went wrong. Please try again later!", life: 3000 });
  }
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
        :value="users"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
        responsiveLayout="scroll">
        <template #header>
          <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 class="m-0">All Users</h5>
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
        <Column field="first_name" header="First Name" :sortable="true" headerStyle="width:14%; min-width:10rem;">
          <template #body="slotProps">
            <span class="p-column-title">First Name</span>
            {{ slotProps.data.first_name }}
          </template>
        </Column>
        <Column field="last_name" header="Last Name" :sortable="true" headerStyle="width:14%; min-width:10rem;">
          <template #body="slotProps">
            <span class="p-column-title">Last Name</span>
            {{ slotProps.data.last_name }}
          </template>
        </Column>
        <Column field="username" header="Username" :sortable="true" headerStyle="width:14%; min-width:8rem;">
          <template #body="slotProps">
            <span class="p-column-title">Username</span>
            {{ slotProps.data.username }}
          </template>
        </Column>
        <Column field="email" header="Email" :sortable="true" headerStyle="width:14%; min-width:10rem;">
          <template #body="slotProps">
            <span class="p-column-title">Email</span>
            {{ slotProps.data.email }}
          </template>
        </Column>
        <Column field="is_admin" header="Is Admin" :sortable="true" headerStyle="width:14%; min-width:10rem;">
          <template #body="slotProps">
            <span class="p-column-title">Is Admin</span>
            {{ slotProps.data.is_admin }}
          </template>
        </Column>
        <Column field="birthday" header="Birthday" :sortable="true" headerStyle="width:14%; min-width:10rem;">
          <template #body="slotProps">
            <span class="p-column-title">Birthday</span>
            {{ slotProps.data.birthday }}
          </template>
        </Column>
        <Column headerStyle="min-width:10rem;">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="edituser(slotProps.data)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mt-2" @click="confirmDeleteuser(slotProps.data)" />
          </template>
        </Column>
      </DataTable>

      <Dialog v-model:visible="userDialog" :style="{ width: '450px' }" header="User Details" :modal="true" class="p-fluid">
        <div class="field">
          <div class="first_name">
            <label for="first_name">First Name</label>
            <InputText id="first_name" v-model.trim="user.first_name" required="true" autofocus :class="{ 'p-invalid': submitted && !user.first_name }" />
            <small class="p-invalid" v-if="submitted && !user.first_name">First Name is required.</small>
          </div>
        </div>
        <div class="field">
          <div class="last_name">
            <label for="last_name">Last Name</label>
            <InputText id="last_name" v-model.trim="user.last_name" required="true" autofocus :class="{ 'p-invalid': submitted && !user.last_name }" />
            <small class="p-invalid" v-if="submitted && !user.last_name">Last Name is required.</small>
          </div>
        </div>
        <div class="field">
          <div class="email">
            <label for="email">Email</label>
            <InputText id="email" v-model.trim="user.email" required="true" autofocus :class="{ 'p-invalid': submitted && !user.email }" />
            <small class="p-invalid" v-if="submitted && !user.email">Email is required.</small>
          </div>
        </div>
        <div class="field">
          <div class="username">
            <label for="username">Username</label>
            <InputText id="username" v-model.trim="user.username" required="true" autofocus :class="{ 'p-invalid': submitted && !user.username }" />
            <small class="p-invalid" v-if="submitted && !user.username">Username is required.</small>
          </div>
        </div>
        <div class="field" v-if="!user.id">
          <div class="password">
            <label for="password">Password</label>
            <InputText id="password" v-model.trim="user.password" required="true" autofocus :class="{ 'p-invalid': submitted && !user.password }" />
            <small class="p-invalid" v-if="submitted && !user.password">Password is required.</small>
          </div>
        </div>
        <div class="field" v-if="!user.id">
          <div class="password_confirmation">
            <label for="password_confirmation">Password Confirmation</label>
            <InputText id="password_confirmation" v-model.trim="user.password_confirmation" required="true" autofocus :class="{ 'p-invalid': submitted && !user.password_confirmation }"/>
            <small class="p-invalid" v-if="submitted && !user.password_confirmation">Password Confirmation is required.</small>
          </div>
        </div>
        <div class="field">
          <label class="mb-3">Is Admin</label>
          <div class="formgrid grid">
            <div class="field-radiobutton col-6">
              <RadioButton id="1" :value="1" v-model="user.is_admin" />
              <label for="1">True</label>
            </div>
            <div class="field-radiobutton col-6">
              <RadioButton id="0" :value=0 v-model="user.is_admin" />
              <label for="0">False</label>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="birthday">
            <label for="birthday">Birthday</label>
            <InputText id="birthday" v-model.trim="user.birthday" required="true" autofocus :class="{ 'p-invalid': submitted && !user.birthday }" placeholder="YYYY-MM-DD"/>
            <small class="p-invalid" v-if="submitted && !user.birthday">Birthday is required.</small>
          </div>
        </div>
        <template #footer>
          <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
          <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveuser" />
        </template>
      </Dialog>

      <Dialog v-model:visible="deleteuserDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
        <div class="flex align-items-center justify-content-center">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
          <span v-if="user"
            >Are you sure you want to delete <b> {{ user.first_name }} {{ user.last_name }}</b
            >?</span
          >
        </div>
        <template #footer>
          <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteuserDialog = false" />
          <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteUser" />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>