<template>
  <component 
  v-if="layout"
  :is="layout + '-layout'">
  </component>
</template>

<script>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import MainLayout from '@/layouts/MainLayout'
import AuthLayout from '@/layouts/AuthLayout'


export default {
  
  setup(){
    const router = useRoute()
    
    return {
      layout: computed(() => router.meta.layout)
    }
  },
  components: {MainLayout, AuthLayout}
}
</script>


