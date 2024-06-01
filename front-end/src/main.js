import "mdb-vue-ui-kit/css/mdb.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-vue-ui-kit/css/mdb.min.css";
import "./main.css";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB3C2pm0lpNm8TP3YJ0uXWfg2FcQxRD-jg",
  authDomain: "vault-pixel.firebaseapp.com",
  projectId: "vault-pixel",
  storageBucket: "vault-pixel.appspot.com",
  messagingSenderId: "783593939491",
  appId: "1:783593939491:web:1a90406b190180d91f4796",
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App).use(router).mount("#app");
