<script setup>
import { ref } from "vue";

const visible = ref(false);
</script>

<template>
  <div class="surface-0 flex justify-content-center">
    <div id="home" class="landing-wrapper" >
      <div
        id="hero"
        class="flex flex-column pt-4 px-4 lg:px-8 overflow-hidden"
        style="
          background-image: linear-gradient(45deg, rgba(40, 46, 56, 0.7), rgba(89, 92, 102, 0.7)), url('/demo/images/landing/house.jpg');
          background-repeat: no-repeat;
          background-position: center;
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
        "
      >
        <div class="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3" id="nav">
          <a class="flex align-items-center" href="/"> <img src="/layout/images/logo.png" height="50" class="mr-2" /> <span class="text-200 font-medium text-2xl line-height-3 mr-8">RealEstate</span> </a>
          <a class="cursor-pointer block lg:hidden text-700">
            <i class="pi pi-bars text-4xl text-white" @click="visible = true"></i>
          </a>
          <div class="align-items-center flex-grow-1 justify-content-center hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2" style="top: 100px">
            <ul class="list-none p-0 m-0 flex lg:align-items-center mx-auto select-none flex-column lg:flex-row cursor-pointer">
              <li>
                <router-link to="/" v-slot="{ navigate }">
                  <a @click="navigate()" class="flex m-0 md:ml-5 px-0 py-3 text-100 font-medium text-lg line-height-3">
                    <span>Home</span>
                  </a>
                </router-link>
              </li>
              <li>
                <router-link to="/pages/shop" v-slot="{ navigate }">
                  <a @click="navigate()" class="flex m-0 md:ml-5 px-0 py-3 text-100 font-medium text-lg line-height-3">
                    <span>Shop</span>
                  </a>
                </router-link>
              </li>
              <li>
                <router-link to="/pages/projectinfo" v-slot="{ navigate }">
                  <a @click="navigate()" class="flex m-0 md:ml-5 px-0 py-3 text-100 font-medium text-lg line-height-3">
                    <span>Project Info</span>
                  </a>
                </router-link>
              </li>
            </ul>

            <Sidebar v-model:visible="visible" style="opacity: 0.87; background-color: black" :showCloseIcon="false">
              <header>
                <a class="flex align-items-center" href="/"> <img src="/layout/images/logo.png" height="50" class="mr-2" /> <span class="text-200 font-medium text-2xl line-height-3 mr-8">RealEstate</span> </a>
              </header>
              <ul class="list-none p-0 m-0 flex lg:align-items-center mx-auto select-none flex-column cursor-pointer">
                <li>
                  <router-link to="/" v-slot="{ navigate }">
                    <a @click="navigate()" class="flex m-0 md:ml-5 px-0 py-3 text-200 font-medium text-lg line-height-3">
                      <span>Home</span>
                    </a>
                  </router-link>
                </li>
                <li>
                  <router-link to="/pages/shop" v-slot="{ navigate }">
                    <a @click="navigate()" class="flex m-0 md:ml-5 px-0 py-3 text-200 font-medium text-lg line-height-3">
                      <span>Shop</span>
                    </a>
                  </router-link>
                </li>
                <li>
                  <router-link to="/pages/projectinfo" v-slot="{ navigate }">
                    <a @click="navigate()" class="flex m-0 md:ml-5 px-0 py-3 text-200 font-medium text-lg line-height-3">
                      <span>Project Info</span>
                    </a>
                  </router-link>
                </li>
              </ul>
              <div class="flex justify-content-between border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
                <router-link to="/pages/auth/login" v-slot="{ navigate }">
                  <Button role="link" label="Login" class="p-button-text p-button-rounded border-none font-light line-height-2 text-200" @click="navigate()" outlined></Button>
                </router-link>
                <router-link to="/pages/auth/register" v-slot="{ navigate }">
                  <Button role="link" label="Register" class="p-button-text bg-orange-500 p-button-rounded border-none font-light line-height-2 text-white" @click="navigate()"></Button>
                </router-link>
              </div>
            </Sidebar>

            <!-- Default topbar -->
            <div class="flex justify-content-between border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
              <router-link to="/pages/auth/login" v-slot="{ navigate }">
                <Button role="link" label="Login" class="p-button-text p-button-rounded border-none font-light line-height-2 text-200" @click="navigate()" outlined></Button>
              </router-link>
              <router-link to="/pages/auth/register" v-slot="{ navigate }">
                <Button role="link" label="Register" class="p-button-text bg-primary p-button-rounded border-none font-light line-height-2 text-white"  @click="navigate()"></Button>
              </router-link>
            </div>
          </div>
        </div>

        <div class="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 my-auto scalein animation-duration-1000 md:w-6 w-11">
          <p class="font-bold text-200 xl:text-7xl text-5xl">The Simplest Way to Find Property</p>
          <p class="font-medium xl:text-xl text-lg text-400">
            With over 20 years of experience, we are pioneers in the real estate business. We believe there's a perfect home for everybody, no matter the budget. That's why we always find the best homes for your budget.
          </p>
        </div>
      </div>

      <!--features start-->
      <div id="features" class="py-4 px-4 lg:px-8 mt-5 mx-0 lg:mx-8 ">
        <div class="flex flex-column text-center mt-8 mb-6">
            <span class="title">Latest Property Listings</span>
            <span class="text-600 text-2xl">Our latest listings at a glance</span>
          </div>
        <div class="flex justify-content-center" >
          <div class="grid px-2 md:px-0" >
            <div class="col-12 lg:col-6 xl:col-4 flex justify-content-evenly" v-for="car in 3" :key="car">
              <Card class="transition-duration-500 shadow-6 hover:shadow-8" v-motion-slide-visible-top :delay="200" :hovered="{ y: -10 }" >
                <template #header>
                  <img src="/demo/images/landing/house1.jpg" style="height: 19rem" class="border-round-top-2xl" />
                </template>
                <template #title>
                  <div class="text-center" style="color: #45525b; font-size: 20px; font-weight: 600; letter-spacing: 1px">Lambourne Road</div>
                </template>
                <template #subtitle>
                  <div class="text-center uppercase" style="font-size: 13px; font-weight: 650; letter-spacing: 2px">APARTMENT</div>
                </template>
                <template #content>
                  <div class="flex justify-content-between mx-2">
                    <div class="flex align-items-center"><i class="pi pi-building" style="font-size: 1.2rem"></i><span class="text-600 font-medium ml-1">130 m<span class="text-sm vertical-align-top">2</span></span></div>
                    <div class="flex align-items-center"><i class="pi pi-inbox" style="font-size: 1.2rem"></i><span class="text-600 font-medium ml-2">3 Bathrooms</span></div>
                    <div class="flex align-items-center"><i class="pi pi-mobile" style="font-size: 1.2rem"></i><span class="text-600 font-medium ml-1">3 Rooms</span></div>
                  </div>
                </template>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <!--features end-->
      <div id="highlights" class="py-6 px-4 lg:px-8 mx-0 my-6 lg:mx-8" style="border-radius: 20px">
        <div class="flex flex-column text-center">
          <span class="title">About Us</span>
          <span class="text-600 text-2xl">Luxury Real Estate company</span>
        </div>

        <div class="grid mt-6 pb-2 md:pb-8"  v-motion-slide-visible-right :delay="400">
          <div class="flex justify-content-center col-12 lg:col-6 p-0 flex-order-1 lg:flex-order-0" style="border-radius: 8px">
            <img src="/demo/images/landing/house1.jpg" class="w-full border-round-xl mt-3" alt="mockup mobile" />
          </div>

          <div class="col-12 lg:col-6 my-auto flex flex-column lg:align-items-end text-center lg:text-right">
            <div class="flex align-items-center justify-content-center bg-purple-200 align-self-center lg:align-self-end" style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
              <i class="pi pi-fw pi-info-circle text-5xl text-purple-700"></i>
            </div>
            <h2 class="line-height-1 text-900 text-4xl font-normal">Love Where You Live</h2>
            <span class="text-s00 text-2xl line-height-3 ml-0 md:ml-2" style="max-width: 650px">
              We are real estate company known for its expertise, reliability, and exceptional service. With years of experience, our dedicated team offers comprehensive solutions for selling properties. 
              We pride ourselves on our vast network, enabling us to present a diverse portfolio of residential and commercial spaces. 
            </span>
          </div>
        </div>

        <div class="grid my-8 pt-2 md:pt-8"  v-motion-slide-visible-left :delay="400">
          <div class="col-12 lg:col-6 my-auto flex flex-column text-center lg:text-left lg:align-items-start">
            <div class="flex align-items-center justify-content-center bg-yellow-200 align-self-center lg:align-self-start" style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
              <i class="pi pi-fw pi-question-circle text-5xl text-yellow-700"></i>
            </div>
            <h2 class="line-height-1 text-900 text-4xl font-normal">Why Us?</h2>
            <span class="text-700 text-2xl line-height-3 mr-0 md:mr-2" style="max-width: 650px">
              From stylish apartments to spacious office buildings, we cater to various budgets and preferences. Trust Us for your real estate needs, as we strive to provide a seamless and satisfying experience for every client."
            </span>
          </div>

          <div class="flex justify-content-end flex-order-1 sm:flex-order-2 col-12 lg:col-6 p-0">
            <img src="/demo/images/landing/house2.jpg" class="w-full border-round-xl mt-3" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#nav {
  border-bottom: 1px solid rgb(255 255 255 / 32%);
}

#hero {
  height: 100vh;
}

.title{
  color: #45525b; 
  font-size: 33px; 
  font-weight: 600; 
  letter-spacing: 1px
}

@media screen and (min-width: 1960px) {
  .landing-wrapper {
    width: 100%;
  }
}

@media screen and (min-width: 992px) {
  #features {
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
}
</style>

