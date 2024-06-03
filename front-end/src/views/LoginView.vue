<template>
  <div class="container p-5">
    <div class="row justify-content-center">
      <div class="col-lg-4 col-md-6 col-sm-8">
        <h1 class="my-3">Log in</h1>

        <div class="row">
          <label for="email">Email</label>
          <input
            class="form-control"
            type="email"
            v-model.trim="email"
            @input="checkEmail"
            ref="emailInput"
          />
          <p v-if="errorMsg.email" class="text-danger">{{ errorMsg.email }}</p>
        </div>
        <div class="row">
          <label for="password">Password</label>
          <input
            class="form-control"
            type="password"
            minlength="6"
            v-model.trim="password"
            @input="checkPassword"
            ref="passwordInput"
          />
          <p v-if="errorMsg.password" class="text-danger">
            {{ errorMsg.password }}
          </p>
        </div>

        <div class="my-4">
          <MDBBtn
            color="dark"
            v-bind:disabled="!formIsFilled"
            :class="['btn', submitButtonColor]"
            @click="signIn"
          >
            Log in</MDBBtn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MDBBtn } from "mdb-vue-ui-kit";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export default {
  name: "LogInView",
  data() {
    return {
      email: "",
      password: "",
      errorMsg: [],
      canSubmit: false,
    };
  },
  props: ["user"],
  components: {
    MDBBtn,
  },
  computed: {
    formIsFilled: function () {
      return this.email && this.password;
    },
    submitButtonColor: function () {
      this.checkSubmit();
      if (this.formIsFilled && this.canSubmit) {
        return "btn-primary";
      } else {
        return "btn-outline-secondary";
      }
    },
  },
  methods: {
    checkEmail: function () {
      const input = this.$refs.emailInput;
      if (!input.checkValidity()) {
        this.errorMsg.email = input.validationMessage;
      } else {
        this.errorMsg.email = null;
      }
    },
    checkPassword: function () {
      const input = this.$refs.passwordInput;

      if (!/[\$\%\^\&\*]+/.test(this.password)) {
        // Checks for at least one special character
        this.errorMsg.password =
          "Username must include at least one special character: $, %, ^, &, or *";
      } else if (!input.checkValidity()) {
        this.errorMsg.password = input.validationMessage;
      } else {
        this.errorMsg.password = null;
      }
    },

    checkSubmit: function () {
      // reset this.canSubmit
      this.canSubmit = true;

      // Check each property in errorMsg
      for (let key in this.errorMsg) {
        if (this.errorMsg[key]) {
          // If there's an error message
          this.canSubmit = false;
          break; // Stop checking further, one error is enough to halt submission
        }
      }
    },
    async signIn() {
      //   const email = prompt("Please enter your email to sign in");
      //   const password = prompt("Please enter your password");
      const auth = getAuth();

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        alert("Successfully signed in");
        console.log("User Details:", userCredential);
      } catch (error) {
        alert(`Login failed: ${error.message}`);
        console.error("Login error:", error);
      }
    },
  },
  async created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$router.replace("/");
      }
    });
  },
};
</script>
