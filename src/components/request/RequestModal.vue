<template>
  <form @submit.prevent="onSubmit">

    <div class="form-control" :class="{invalid: fioMessage}">
      <label for="fio">ФИО</label>
      <input type="text" name="fio" id="fio" v-model="fio" @blur="fioBlur">
      <small v-if="fioMessage">{{fioMessage}}</small>
    </div>

    <div class="form-control" :class="{invalid: phoneMessage}">
      <label for="phone">Телефон</label>
      <input type="text" name="phone" id="phone" v-model="phone" @blur="phoneBlur">
      <small v-if="phoneMessage">{{phoneMessage}}</small>
    </div>

    <div class="form-control" :class="{invalid: amountMessage}">
      <label for="amount">Сумма</label>
      <input type="number" min="1" name="amount" id="amount" v-model.number="amount" @blur="amountBlur">
      <small v-if="amountMessage">{{amountMessage}}</small>
    </div>

    <div class="form-control">
      <label for="status">Статус</label>
      <select name="status" id="status" v-model="status">
        <option value="pending">Выполняется</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="done">Завершён</option>
      </select>
    </div>

    <button type="submit" class="btn primary" :disabled="isSubmitting">Добавить</button>
  </form>
</template>

<script>
import {useRequestModal} from "../../use/requestModal";
import {useStore} from 'vuex'

export default {
  emits: ['created'],
  setup(_, {emit}){
    const store = useStore()
    const submit = values => {
      store.dispatch('requests/create', values)
      emit('created')
    }

    return {...useRequestModal(submit)}
  }
}
</script>

<style scoped>

</style>