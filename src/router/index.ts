import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import BasicLayout from "@/layout/BasicLayout.vue";
// import { useUserStore } from '@/stores/user';
// import { usePermissionStore } from '@/stores/permission';
// import { markRaw } from 'vue';

//静态路由，与权限无关，所有用户都可以访问

export const constantRoutes: AppRouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/scale",
    component: BasicLayout,
    children: [
      {
        path: "scale",
        component: () => import("@/views/Scale/ScreenScale.vue"),
        meta: { title: "监测中心", icon: "Monitor" },
      },
    ],
  },

  {
    path: "/task",
    component: BasicLayout,

    children: [
      {
        path: "",
        component: () => import("@/views/Task/Task.vue"),
        meta: { title: "任务管理", icon: "Operation" },
      },
    ],
  },
  {
    path: "/message",
    component: BasicLayout,
    children: [
      {
        path: "",
        component: () => import("@/views/Message/Message.vue"),
        meta: { title: "信息管理", icon: "Document" },
      },
    ],
  },

  {
    path: "/login",
    component: () => import("@/views/Login/Login.vue"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/Error/404.vue"),
    hidden: true,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "404",
    hidden: true,
  },
];

//动态路由，配置了 roles 的路由，只有用户拥有该角色时可以访问

export const asyncRoutes: AppRouteRecordRaw[] = [];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes as RouteRecordRaw[],
});

//全局路由守卫（每次切换路由前执行
//如果没有 token，跳转到登录页， 如果有 token，进一步判断是否有角色，有角色就进入路由，如果没有角色就获取角色，然后根据获取到的角色过滤动态路由，最终将过滤后的动态路由添加到路由表中

router.beforeEach((to) => {
  const token = sessionStorage.getItem("token");
  // const userStore = useUserStore();
  // const permissionStore = usePermissionStore();

  if (token) {
    if (to.path === "/login") {
      // return "/";
    } else {
      // const curRoles = userStore.roles ? userStore.roles : [];
      // if (curRoles.length) {
      //   const accessedRoutes = permissionStore.generateRoutes(curRoles);
      //   accessedRoutes.forEach((route: RouteRecordRaw) => {
      //     router.addRoute(route);
      //     return to.fullPath;
      //   });
      // }
      // else {
      //   return '/login';
      // }
    }
  } else {
    if (to.path !== "/login") {
      return "/login";
    }
  }
});

export default router;
