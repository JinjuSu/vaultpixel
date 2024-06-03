import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../views/NotFoundView.vue";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ProductsView from "../views/ProductsView.vue";
import ProductDetailsView from "../views/ProductDetailsView.vue";
import CartView from "../views/CartView.vue";
import PaymentView from "../views/PaymentView.vue";
import PurchaseHistoryView from "../views/PurchaseHistoryView.vue";
import PurchasedOrderView from "../views/PurchasedOrderView.vue";
import SignUpView from "@/views/SignUpView.vue";
import LoginView from "@/views/LoginView.vue";

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
  {
    path: "/payment/:orderId",
    name: "payment",
    component: PaymentView,
    props: true,
  },
  {
    path: "/purchasehistory",
    name: "purchasehistory",
    component: PurchaseHistoryView,
    props: true,
  },
  {
    path: "/purchasedorder/:orderId",
    name: "purchasedorder",
    component: PurchasedOrderView,
    props: true,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpView,
    props: true,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
