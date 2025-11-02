import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import Register from "@/views/Register.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/profile" },
    { path: "/login", component: Login },
    { path: "/profile", component: Profile },
    { path: "/register", component: Register },
  ],
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  if (!auth.token && to.path !== "/login" && to.path !== "/register") {
    return "/login";
  }
});

export default router;
