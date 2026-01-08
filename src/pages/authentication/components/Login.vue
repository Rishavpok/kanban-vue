<template>
  <div class="register-card">
    <h2>Login</h2>

    <form @submit.prevent="onSubmit" >
      <div class="field-group">
        <label for="email">Email</label>
        <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Enter your email" />

        <span class="error" > {{ emailError }} </span>
      </div>

      <div class="field-group">
        <label for="password">Password</label>
        <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Enter your password" />

        <span class="error" > {{ passwordError }} </span>
      </div>

      <button
          :disabled="isLoading"
          type="submit"
          class="submit-btn">
        {{ isLoading ? "...." : "Login" }}
      </button>
    </form>

    <div class="login-link">
      Already have an account? <a @click="register" >Register</a>
    </div>
  </div>
</template>
<script setup lang="ts">

import {useRouter} from "vue-router";
import {ref} from "vue";
import * as yup from "yup";
import {useField, useForm} from "vee-validate";
import {  login } from "../services/auth.service"

const router = useRouter();
const isLoading = ref(false);
const error = ref("");

// form setup  and validation

const schema = yup.object({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
})

const  { handleSubmit } = useForm({
  validationSchema: schema,
})

const { value : email , errorMessage : emailError } = useField("email")
const { value : password , errorMessage : passwordError } = useField("password")


const onSubmit =  handleSubmit( async (values) =>  {
  try {
     isLoading.value = true
    const res = await login(values)

    if(res) {
      localStorage.setItem("token", res.data.access_token)
      router.push("/")
    }


  } catch(error) {
    error.value = e.response?.data?.message || 'Login failed'
  } finally {
    isLoading.value = false
  }
} )

function register() {
  router.push("/register");
}

</script>

<style scoped>
.register-card {
  background: #ffffff;
  width: 360px;
  margin: auto;
  padding: 32px 28px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
}

.register-card h2 {
  margin: 0 0 20px;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: #333;
}

.field-group {
  margin-bottom: 16px;
}

.field-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #444;
}

.field-group input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  background: #fafafa;
}

.field-group input:focus {
  border-color: #007bff;
}

.submit-btn {
  width: 100%;
  padding: 12px 0;
  background: #007bff;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn:hover {
  background: #0063d6;
}

.login-link {
  margin-top: 12px;
  text-align: center;
  font-size: 13px;
  color: #555;
}

.login-link a {
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>