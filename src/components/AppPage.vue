<template>
  <div class="card">
    <router-link v-if="back" to="/">Вернуться на главную</router-link>
    <h1 class="card-title">
      {{title}}
      <slot name="header"/>
    </h1>
    <slot/>
  </div>
</template>

<script>
export default {
props: {
  title: {
    type: String,
    required: true
  },
  back: {
    type: Boolean,
    required: false,
    default: false
  }
},
  setup(props){
    document.title = `${props.title} | Онлайн Банк`
  }
}
</script>

<style scoped>

</style>