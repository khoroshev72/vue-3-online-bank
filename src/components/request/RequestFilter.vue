<template>
  <div class="filter">
    <div class="form-control">
      <input type="text" placeholder="Введите имя" v-model="name">
    </div>
    <div class="fom-control">
      <select v-model="status">
        <option selected disabled>Выберите статус</option>
        <option value="pending">Выполняется</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="done">Завершён</option>
      </select>
    </div>
    <button v-if="isActive" @click="reset" class="btn warning">Очистить</button>
  </div>
</template>

<script>
import {ref, watch, computed} from 'vue'
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(_, {emit}){
    const name = ref()
    const status = ref()
    const isActive = computed(() => name.value || status.value)

    watch([name, status], values => {
      emit('update:modelValue', {
        name: values[0],
        status: values[1]
      })
    })

    return {
      name, status, isActive,
      reset: () => {
        name.value = ''
        status.value = null
      }
    }
  }
}
</script>

<style scoped>

</style>