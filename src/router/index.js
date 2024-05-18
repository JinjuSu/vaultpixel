import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ProductsView from "../views/ProductsView.vue";
import ProductDetailsView from "../views/ProductDetailsView.vue";
import CartView from "../views/CartView.vue";
import NotFound from "../views/NotFoundView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
  },
  {
    path: "/products",
    name: "products",
    component: ProductsView,
  },
  {
    path: "/product/:id",
    name: "productdetails",
    component: ProductDetailsView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
