<template>
  <div class="sidebar">
    <div class="sidebar-close" @click="close">&times;</div>
    <div class="sidebar-content">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, quis?</p>
    </div>
  </div>
</template>

<script>
import {useStore} from 'vuex'
export default {
  
  setup(){
    const store = useStore()

    const close = () => store.commit('closeSidebar')

    return {
      close
    }
  }

}
</script>

<style scoped>

</style>