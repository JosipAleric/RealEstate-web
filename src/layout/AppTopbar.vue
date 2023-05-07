<template>
    <div class="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3">
        <a class="flex align-items-center" href="/"> <img src="/layout/images/logo.png" alt="AppLogo" height="50" class="mr-2" /><span class="text-900 font-medium text-2xl line-height-3 mr-8">AutoSalon</span> </a>
        <a class="cursor-pointer block lg:hidden text-700"  v-styleclass="{ selector: '@next', enterClass: 'hidden', leaveToClass: 'hidden', hideOnOutsideClick: true }">
            <i class="pi pi-bars text-4xl"></i>
        </a>
        <div class="align-items-center surface-0 flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2" style="top: 100px">
            <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
                <li>
                    <router-link to="/" v-slot="{ navigate }">
                        <a @click="navigate()" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                            <span>Home</span>
                        </a>
                    </router-link>
                </li>
                <li>
                    <router-link to="/pages/shop" v-slot="{ navigate }">
                        <a @click="navigate()" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                            <span>Shop</span>
                        </a>
                    </router-link>
                </li>
                <li>
                    <router-link to="/pages/projectinfo" v-slot="{ navigate }">
                        <a @click="navigate()" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                            <span>Project Info</span>
                        </a>
                    </router-link>
                </li>
            </ul>

            <!-- Default topbar -->
            <div v-if="isLogged === false">
                <div class="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
                    <router-link to="/pages/auth/login" v-slot="{ navigate }">
                        <Button role="link" label="Login" class="p-button-text p-button-rounded border-none font-light line-height-2 text-primary" @click="navigate()"></Button>
                    </router-link>
                    <router-link to="/pages/auth/register" v-slot="{ navigate }">
                        <Button role="link" label="Register" class="p-button-text bg-primary p-button-rounded border-none font-light line-height-2 text-white" @click="navigate()"></Button>
                    </router-link>
                </div>
            </div>

            <!-- Topbar after user logs in -->
            <div v-if="isLogged === true">
                <div class="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
                    <Menu ref="menu" :model="overlayMenuItems" :popup="true" class="mt-2" />
                    <a class="flex align-items-center cursor-pointer text-600" @click="toggle">
                        <img :src="'/demo/images/avatar/' + this.userInfo.image_path" width="40" height="40" alt="">
                        <span class="font-medium text-900 text-lg mx-2">{{this.userInfo.first_name}} {{ this.userInfo.last_name }}</span>
                        <i class="pi pi-angle-down pt-1"></i>
                    </a>
                </div>
            </div>
            <Toast position="top-right"/>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { ref } from 'vue'
export default {
  data () {
    return {
      isLogged: this.checkIfIsLogged(),
      menu: null,
      overlayMenuItems: ref([
            {
                label: "Profile Settings",
                icon: "pi pi-user-edit",
                to: '/pages/user/userprofile'
            },
            {
                label: 'Dashboard',
                icon: "pi pi-id-card",
                visible: () => this.userInfo.is_admin,
                to: '/pages/user/dashboard'
            },
            {
                label: 'Orders',
                icon: "pi pi-wallet",
                to: '/pages/user/orders'
            },
            {
              separator: true
            },
            {
                label: "Logout",
                icon: "pi pi-sign-out",
                command:() => {
                    this.logout()
                }
            }
        ]),
        userInfo: []
    }
  },

  methods: {
    toggleSuccessToast() {
      this.$toast.add({
        severity: "success",
        summary: "Success Message",
        detail: "Logged out successfully!",
        life: 4000,
      });
    },

    toggle(event) {
            this.$refs.menu.toggle(event);
        },

    logout() {
      axios
        .get(
          "/api/auth/logout",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          localStorage.removeItem('token')
          this.isLogged = this.checkIfIsLogged()
          this.toggleSuccessToast();
          this.$router.push("/")
        })
        .catch((error) => {
            console.log(error)
        });
    },
    checkIfIsLogged () {
      let token = window.localStorage.getItem('token')
      if (token) {
        this.getUserInfo()
        return true
      } else {
        return false
      }
    },
    getUserInfo(){
        axios
        .get(
          "/api/auth/user")
        .then((response) => {
          this.userInfo = response.data
        })
        .catch((error) => {
            console.log(error)
        });
    },
  },
}
</script>

<style lang="scss" scoped></style>
