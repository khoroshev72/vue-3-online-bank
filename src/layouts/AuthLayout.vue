<template>
  <div class="container">
    <app-alert></app-alert>
    <router-view></router-view>
  </div>
</template>

<script>
import AppAlert from "../components/ui/AppAlert";
import {useRoute} from 'vue-router'
import {useStore} from "vuex";
import {error} from "../utils/error";
export default {
  setup(){
    const route = useRoute()
    const store = useStore()
    if (route.query.message){
      store.dispatch('setMessage', {
        type: 'warning',
        value: error(route.query.message)
      })
    }
  },
  components: {AppAlert}
}
</script>