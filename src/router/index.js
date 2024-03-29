import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/app',
      component: AppLayout,
      children: [
        {
          path: "/pages/projectinfo",
          name: "projectinfo",
          component: () => import("@/views/pages/ProjectInfo.vue"),
        },
        {
          path: "/pages/shop",
          name: "shop",
          component: () => import("@/views/pages/Shop.vue"),
        },
        {
          path: "/pages/user/userprofile",
          name: "profile",
          component: () => import("@/views/pages/user/UserProfile.vue"),
        },{
          path: "/pages/user/orders",
          name: "orders",
          component: () => import("@/views/pages/user/Orders.vue"),
        },
        {
          path: "/pages/user/dashboard",
          name: "dashboard",
          component: () => import("@/views/pages/user/Dashboard.vue"),
        },
      ]
    },
    {
      path: '/',
      name: 'landing',
      component: () => import('@/views/Landing.vue')
    },
    {
      path: "/pages/auth/login",
      name: "login",
      component: () => import("@/views/pages/auth/Login.vue"),
    },
    {
      path: "/pages/auth/register",
      name: "register",
      component: () => import("@/views/pages/auth/Register.vue"),
    },
  ]
})

export default router
