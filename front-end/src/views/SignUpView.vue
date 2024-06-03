<template>
  <div class="container p-5">
    <div class="row justify-content-center">
      <div class="col-lg-4 col-md-6 col-sm-8">
        <h1 class="my-3">Sign up</h1>

        <div class="row">
          <label for="username">Username</label>
          <input
            class="form-control"
            type="text"
            maxlength="8"
            v-model.trim="username"
            @input="checkUsername"
            ref="usernameInput"
          />
          <p v-if="errorMsg.username">{{ errorMsg.username }}</p>
        </div>
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
        <div class="row">
          <label for="confirmPassword">Confirm password</label>
          <input
            class="form-control"
            type="password"
            minlength="6"
            v-model.trim="confirmPassword"
            @input="checkCPassword"
            ref="confirmPasswordInput"
          />
          <p v-if="errorMsg.confirmPassword" class="text-danger">
            {{ errorMsg.confirmPassword }}
          </p>
        </div>
        <div class="my-4">
          <!-- <router-link to="/login"> -->
          <MDBBtn
            color="dark"
            v-bind:disabled="!formIsFilled"
            :class="['btn', submitButtonColor]"
            @click="signUp"
          >
            Sign up
          </MDBBtn>
          <!-- </router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MDBBtn } from "mdb-vue-ui-kit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import axios from "axios";

export default {
  name: "SignUpView",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
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
      return (
        this.username && this.email && this.password && this.confirmPassword
      );
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
    checkUsername: function () {
      const input = this.$refs.usernameInput;

      if (!input.checkValidity()) {
        this.errorMsg.username = input.validationMessage;
      } else {
        this.errorMsg.username = null;
      }
    },
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
    checkCPassword: function () {
      if (this.confirmPassword !== this.password) {
        // Checks for at least one special character
        this.errorMsg.confirmPassword = "Passwords do not match";
      } else {
        this.errorMsg.confirmPassword = null;
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
    async signUp() {
      if (!this.canSubmit) {
        return;
      }
      const auth = getAuth();
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;

        // Add user to MongoDB
        const response = await axios.post("/api/users", {
          uid: user.uid, // UID from Firebase
          username: this.username, // Username entered by the user
        });
        if (response.status === 201) {
          alert("Account created successfully!");
          this.$router.push("/login");
        } else {
          alert(`Failed to add user to database: ${response.data}`);
        }

        console.log(userCredential);
      } catch (error) {
        alert(`Failed to create account: ${error.message}`);
        console.error("Signup error:", error);
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

<style scoped>
#cardnum {
  position: relative;
}
#cvv {
  bottom: 0;
  padding-bottom: 0;
}
</style>
