<template>
  <div class="question" @click="isOpen = !isOpen">
    <div class="question-title">{{question.title}}</div>
    <p v-if="isOpen">{{question.text}}</p>
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
  props: ['question'],
  setup(props){
    const isOpen = ref(false)

    return {
      question: props.question,
      isOpen
    }
  }
}
</script>

<style scoped>

</style>