<template>
  <div class="grid flex align-items-center justify-content-center">
    <div class="col-12 lg:w-11 xl:w-7">
      <div class="surface-section mx-5">
        <div class="font-medium text-3xl text-900 mb-3">Profile Information</div>
        <div class="text-500 text-xl mb-5">All of your profile informations at one place.</div>
        <div class="flex justify-content-center">
          <div class="border-circle w-10rem h-10rem m-2 mb-8 flex align-items-center justify-content-center relative">
            <div>
              <img :src="'/demo/images/avatar/' + this.avatar" width="170" height="170" />
            </div>
            <Button type="button" @click="changeAvatar()" class="p-button-primary p-button-rounded absolute bottom-0 right-0" icon="pi pi-camera" :disabled="this.disabled" />
          </div>
        </div>
        <div>
          <div class="grid">
            <div class="col-12 md:col-6">
              <h5>First Name</h5>
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-user"></i>
                </span>
                <InputText v-model="firstName" :disabled="disabled" />
              </div>
            </div>
            <div class="col-12 md:col-6">
              <h5>Last Name</h5>
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-user"></i>
                </span>
                <InputText v-model="lastName" :disabled="disabled" />
              </div>
            </div>
            <div class="col-12">
              <h5>Username</h5>
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-at"></i>
                </span>
                <InputText v-model="username" :disabled="disabled" />
              </div>
            </div>
            <div class="col-12">
              <h5>Email</h5>
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-envelope"></i>
                </span>
                <InputText v-model="email" :disabled="disabled" />
              </div>
            </div>
            <div class="col-12">
              <h5>Password</h5>
              <div class="p-inputgroup">
                <Password v-model="password" :disabled="disabled" />
              </div>
            </div>
            <div class="col-12">
              <h5>Birthday</h5>
              <div class="p-inputgroup">
                <Calendar :showIcon="true" :showButtonBar="true" :disabled="disabled" v-model="date" dateFormat="yy/mm/dd"></Calendar>
              </div>
              <Button @click="this.disabled = !this.disabled" class="px-4 my-4 shadow-4 hover:shadow-6"><span class="p-button-label">Update profile</span></Button>
              <Button v-if="!this.disabled" @click="updateProfile()" class="ml-2 px-4 my-4 shadow-4 hover:shadow-6"><span class="p-button-label">Save changes</span></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Toast position="top-right" />
</template>

<script>
import { useLayout } from "@/layout/composables/layout";
const { layoutConfig } = useLayout();
import axios from "axios";

export default {
  data() {
    return {
      disabled: true,
      id: null,
      avatar: "",
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      errors: [],
      date: null,
    };
  },

  methods: {
    changeAvatar() {
      if (this.avatar == "default_avatar.png") {
        this.avatar = "female_avatar.png";
      } else {
        this.avatar = "default_avatar.png";
      }
    },

    getUserInfo() {
      axios
        .get("/api/auth/user", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.firstName = response.data.first_name;
          this.lastName = response.data.last_name;
          this.username = response.data.username;
          this.email = response.data.email;
          this.password = response.data.password;
          this.date = response.data.birthday;
          this.avatar = response.data.image_path;
          this.id = response.data.id;
        })
        .catch((error) => {
          if (error.response.status == 401 || error.response.status == 403) {
            this.$router.push('/pages/auth/login')
          } else {
            this.$toast.add({
              severity: "error",
              summary: "Error Message",
              detail: "Something went wrong, please try again later!",
              life: 4000,
            });
          }
        });
    },

    updateProfile() {
      this.date = new Date(this.date);
      axios
        .put(
          "/api/auth/user",
          {
            first_name: this.firstName,
            last_name: this.lastName,
            username: this.username,
            email: this.email,
            password: this.password,
            birthday: this.date.toISOString().split("T")[0],
            image_path: this.avatar,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.disabled = true;
          this.toggleSuccessToast();
        })
        .catch((error) => {
          if (error.response) {
            this.errors = error.response.data.errors;
          } else if (error.request) {
            this.errors = ["The request was made but no response was received. Please try again later!"];
          }
          this.toggleErrorToast();
        });
    },
    // Success response message
    toggleSuccessToast() {
      this.$toast.add({
        severity: "success",
        summary: "Success Message",
        detail: "Profile updated successfully!",
        life: 4000,
      });
    },

    // Error response message
    toggleErrorToast() {
      for (var i = 0; i < Object.keys(this.errors).length; i++) {
        this.$toast.add({
          severity: "error",
          summary: "Error Message",
          detail: Object.values(this.errors)[i],
          life: 4000,
        });
      }
    },
  },

  mounted() {
    this.getUserInfo();
  },

};
</script>