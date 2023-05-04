import { createRouter, createWebHistory } from "vue-router";
import { getNavDate } from "@/api";
import { getToken, removeToken } from "@/utils/auth";
import { useMainStore } from "@/stores";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/index.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register/index.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = getToken();
  if (token) {
    if (to.path !== "/login") {
      const store = useMainStore();
      if (store && store.nav.length === 0) {
        try {
          // 发送请求，获取数据
          let result = await getNavDate();
          if (result.code === 200 && result.ok) {
            // 数据缓存
            store.setNav(result.data.res);
            // 转换数据类型
            const navData = fn(result.data.res);
            // 动态路由数据添加
            router.addRoute(navData);
            next({ path: to.path });
          }
        } catch (error) {
          // token失效，清空token，跳转登录
          removeToken();
          next("/login");
        }
      } else {
        next();
      }
    } else {
      next("/home");
    }
  } else {
    if (to.path !== "/register" && to.path !== "/login") {
      next("/login");
    } else {
      next();
    }
  }
});

function fn(res) {
  let homeRoutes = routes.filter((route) => route.name === "home")[0];
  homeRoutes.children = [];
  res.forEach((item) => {
    homeRoutes.children.push({
      path: item.path,
      name: item.name,
      component: () => import(`@/views/Home/components/${item.component}.vue`),
    });
  });
  return homeRoutes;
}

export default router;
