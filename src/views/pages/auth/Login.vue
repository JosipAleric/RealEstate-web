<script setup>
import { useLayout } from "@/layout/composables/layout";
const { layoutConfig } = useLayout();
</script>

<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden zoomin animation-duration-500">
    <div class="flex flex-column align-items-center justify-content-center px-2 md:px-0">
      <img src="/layout/images/logo.png" alt="logo" class="mb-5 w-6rem flex-shrink-0" />
      <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
          <div class="text-center mb-5">
            <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-3" />
            <div class="text-900 text-3xl font-medium mb-3">Welcome Back!</div>
            <span class="text-600 font-medium">Sign in to continue</span>
          </div>

          <div>
            <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
            <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="email" />

            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
            <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem" :feedback="false"></Password>

            <div class="flex align-items-center justify-content-between mb-4 gap-5">
              <div class="flex align-items-center">
                <router-link to="/pages/auth/register" v-slot="{ navigate }">
                  <a @click="navigate()" class="font-medium no-underline cursor-pointer" style="color: var(--primary-color)">Don't have an account? Sign Up!</a>
                </router-link>
              </div>
              <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
            </div>

            <div class="flex align-items-center justify-content-left mb-4 gap-5">
              <Checkbox v-model="checked" id="rememberme1" binary class="mr-0"></Checkbox>
              <label for="rememberme1">Remember me</label>
            </div>
            <Button label="Sign In" class="w-full p-3 text-xl" @click="login()"></Button>
          </div>
        </div>
      </div>
    </div>
    <Toast position="top-right" />
  </div>
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      checked: false,
      registrationErrors: [],
      satus: "",
    };
  },
  methods: {
    redirect() {},
    login() {
      axios
        .post(
          "/api/auth/login",
          {
            email: this.email,
            password: this.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access_token;
          localStorage.setItem("token", JSON.stringify(response.data.access_token));
          this.toggleSuccessToast();
          setTimeout(() => this.$router.push("/"), 1100);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data.errors);
            this.registrationErrors = error.response.data.errors;
          } else if (error.request) {
            this.registrationErrors = ["The request was made but no response was received. Please try again later!"];
          }
          this.toggleErrorToast();
        });
    },

    // Success response message
    toggleSuccessToast() {
      this.$toast.add({
        severity: "success",
        summary: "Success Message",
        detail: "Logged in successfully!",
        life: 4000,
      });
    },

    // Error response message
    toggleErrorToast() {
      for (var i = 0; i < Object.keys(this.registrationErrors).length; i++) {
        this.$toast.add({
          severity: "error",
          summary: "Error Message",
          detail: Object.values(this.registrationErrors)[i],
          life: 4000,
        });
      }
    },
  },
};
</script>
