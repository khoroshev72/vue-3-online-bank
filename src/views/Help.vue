<template>
  <app-page title="Вопросы">
    <app-question
    v-for="q in questions"
    :key="q.title"
    :question="q">
    </app-question>
  </app-page>
</template>

<script>
import AppPage from "../components/AppPage";
import AppQuestion from "../components/AppQuestion";

export default {
  setup(){
    const questions = [
      {title: 'Как работает Vue-Router?', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing'},
      {title: 'React или Vue?', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'}
    ]

    return {questions}
  },
  components: {AppPage, AppQuestion}
}
</script>
