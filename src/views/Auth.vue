<template>
  <div class="card">
    <h1>Вход в систему</h1>

    <form @submit.prevent="onSubmit">
      
      <div :class="['form-control', {invalid: emailMessage}]">
        <label for="email">Email</label>
        <input type="text" id="email" name="email" v-model="email" @blur="emailBlur">
        <small v-if="emailMessage">{{emailMessage}}</small>
      </div>

      <div :class="['form-control', {invalid: passwordMessage}]">
        <label for="password">Пароль</label>
        <input type="pasword" id="password" name="password" v-model="password" @blur="passwordBlur">
        <small v-if="passwordMessage">{{passwordMessage}}</small>
      </div>

      <button class="btn primary" :disabled="isSubmitting || tooManyAttempts">Войти</button>
      <div class="text-danger" v-if="tooManyAttempts">
          Вы слишком часто пытаетесь отправить форму. Попробуйте позже
      </div>
    </form>    

  </div>
</template>

<script>
import {useLoginForm} from '@/use/loginForm.js'

export default {
  setup(){
    return {...useLoginForm()}
  }
}
</script>