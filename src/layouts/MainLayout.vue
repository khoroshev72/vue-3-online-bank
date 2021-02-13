<template>
  <div class="container with-nav">
    <the-navbar/>
    <the-sidebar v-if="$store.state.sidebar === true" />
    <app-alert></app-alert>
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
import AppAlert from "../components/ui/AppAlert";
import TheSidebar from "../components/TheSidebar";

export default {
  components: {TheNavbar, AppAlert, TheSidebar}
}
</script>