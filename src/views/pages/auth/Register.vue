<template>
  <div class="form-demo zoomin animation-duration-500">
    <Toast position="top-right" />
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
      <div class="flex flex-column align-items-center justify-content-center px-2 md:px-0">
        <img src="/layout/images/logo.png" alt="logo" class="mb-5 w-6rem flex-shrink-0" />
        <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
          <div class="w-full surface-card py-8 px-8" style="border-radius: 53px">
            <div class="text-center mb-5">
              <div class="text-900 text-3xl font-medium mb-3">Welcome!</div>
              <span class="text-600 font-medium">Register for free now!</span>
            </div>

            <h5 class="text-center">Register</h5>
            <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid md:w-30rem" method="POST">
              <div class="field">
                <div class="p-float-label mt-5 p-input-icon-right">
                  <i class="pi pi-user" />
                  <InputText id="name" v-model="v$.name.$model" :class="{ 'p-invalid': v$.name.$invalid && submitted }" />
                  <label for="name" :class="{ 'p-error': v$.name.$invalid && submitted }">First Name*</label>
                </div>
                <small v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error">{{ v$.name.required.$message.replace("Value", "First Name") }}</small>
              </div>

              <div class="field">
                <div class="p-float-label mt-5">
                  <InputText id="surname" v-model="v$.surname.$model" :class="{ 'p-invalid': v$.surname.$invalid && submitted }" />
                  <label for="surname" :class="{ 'p-error': v$.surname.$invalid && submitted }">Last Name*</label>
                </div>
                <small v-if="(v$.surname.$invalid && submitted) || v$.surname.$pending.$response" class="p-error">{{ v$.surname.required.$message.replace("Value", "Last Name") }}</small>
              </div>

              <div class="field">
                <div class="p-float-label mt-4 p-input-icon-right">
                  <i class="pi pi-at" />
                  <InputText id="username" v-model="v$.username.$model" :class="{ 'p-invalid': v$.username.$invalid && submitted }" />
                  <label for="username" :class="{ 'p-error': v$.username.$invalid && submitted }">Username*</label>
                </div>
                <small v-if="(v$.username.$invalid && submitted) || v$.username.$pending.$response" class="p-error">{{ v$.username.required.$message.replace("Value", "Username") }}</small>
              </div>

              <div class="field">
                <div class="p-float-label p-input-icon-right mt-4">
                  <i class="pi pi-envelope" />
                  <InputText id="email" v-model="v$.email.$model" :class="{ 'p-invalid': v$.email.$invalid && submitted }" aria-describedby="email-error" />
                  <label for="email" :class="{ 'p-error': v$.email.$invalid && submitted }">Email*</label>
                </div>
                <span v-if="v$.email.$error && submitted">
                  <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                    <small class="p-error">{{ error.$message }}</small>
                  </span>
                </span>
                <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">{{ v$.email.required.$message.replace("Value", "Email") }}</small>
              </div>
              <div class="field">
                <div class="p-float-label mt-4">
                  <Password id="password" v-model="v$.password.$model" :class="{ 'p-invalid': v$.password.$invalid && submitted }" toggleMask>
                    <template #header>
                      <h6>Pick a password</h6>
                    </template>
                    <template #footer="sp">
                      {{ sp.level }}
                      <Divider />
                      <p class="mt-2">Suggestions</p>
                      <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                        <li>Minimum 5 characters</li>
                      </ul>
                    </template>
                  </Password>
                  <label for="password" :class="{ 'p-error': v$.password.$invalid && submitted }">Password*</label>
                </div>
                <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">{{ v$.password.required.$message.replace("Value", "Password") }}</small>
              </div>
              <div class="field">
                <div class="p-float-label mt-4">
                  <Password
                    id="confirmed_password"
                    v-model="v$.confirmed_password.$model"
                    :class="{
                      'p-invalid': v$.confirmed_password.$invalid && submitted,
                    }"
                    toggleMask
                    :feedback="false"
                  >
                    <template #header>
                      <h6>Confirm a password</h6>
                    </template>
                  </Password>
                  <label
                    for="confirmed_password"
                    :class="{
                      'p-error': v$.confirmed_password.$invalid && submitted,
                    }"
                    >Confirm a password*</label
                  >
                </div>
                <small v-if="(v$.confirmed_password.$invalid && submitted) || confirmed_password != password || v$.confirmed_password.$pending.$response" class="p-error">{{ "Confirmed Password must be the same as the original password" }}</small>
              </div>
              <div class="field">
                <div class="p-float-label mt-4">
                  <Calendar id="date" v-model="date" :showIcon="true" />
                  <label for="date">Birthday</label>
                </div>
              </div>
              <div class="field-checkbox">
                <Checkbox id="accept" name="accept" value="Accept" v-model="v$.accept.$model" :class="{ 'p-invalid': v$.accept.$invalid && submitted }" />
                <label for="accept" :class="{ 'p-error': v$.accept.$invalid && submitted }">I agree to the terms and conditions*</label>
              </div>
              <Button type="submit" label="Register" class="mt-2" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { email, required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import axios from "axios";

export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      confirmed_password: "",
      date: null,
      accept: null,
      submitted: false,
      registrationErrors: [],
    };
  },
  validations() {
    return {
      name: {
        required,
      },
      surname: {
        required,
      },
      username: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(5),
      },
      confirmed_password: {
        required,
      },
      accept: {
        required,
      },
    };
  },

  methods: {
    handleSubmit(isFormValid) {
      this.submitted = true;
      this.registrationErrors = [];

      if (!isFormValid) {
        return;
      }
      axios
        .post(
          "/api/auth/register",
          {
            first_name: this.name,
            last_name: this.surname,
            username: this.username,
            email: this.email,
            password: this.password,
            password_confirmation: this.confirmed_password,
            birthday: this.date.toISOString().split("T")[0],
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
          setTimeout(() => this.$router.push("/"), 1500);
        })
        .catch((error) => {
          if (error.response) {
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
        detail: "User created successfully! Redirecting yout to the home page...",
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

<style lang="scss" scoped>
.form-demo {
  .card {
    min-width: 450px;

    form {
      margin-top: 2rem;
    }

    .field {
      margin-bottom: 1.5rem;
    }
  }

  @media screen and (max-width: 960px) {
    .card {
      width: 80%;
    }
  }
}

.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
