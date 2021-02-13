<template>
  <span :class="['badge', type]">{{text}}</span>
</template>

<script>
import {watch, ref} from 'vue'
export default {
props: {
  type: {
    type: String,
    required: true,
    validator(value){
      return ['active', 'pending', 'cancelled', 'done'].includes(value)
    }
  }
},
  setup(props){

    const textMap = {
      active: 'Активен',
      pending: 'Выполняется',
      cancelled: 'Отменен',
      done: 'Завершён'
    }

    const classesMap = {
      active: 'primary',
      pending: 'primary',
      cancelled: 'danger',
      done: 'warning'
    }

    const text = ref(textMap[props.type])
    const type = ref(classesMap[props.type])

    watch(props, val => {
        text.value = textMap[val.type]
        type.value = classesMap[val.type]
    })

    return {
      text, type
    }
  }
}
</script>

<style scoped>

</style>