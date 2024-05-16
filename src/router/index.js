import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import About from "../views/AboutView.vue";
import Products from "../views/ProductsView.vue";
import Cart from "../views/CartView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/products",
    name: "products",
    component: Products,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
