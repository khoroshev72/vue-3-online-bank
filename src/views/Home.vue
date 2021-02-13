<template>
  <app-loader v-if="loading"></app-loader>
  <app-page v-else title="Список заявок">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>

    <request-filter v-model="filter"></request-filter>
    <request-table :requests="requests"></request-table>

    <teleport to="body">
      <app-modal v-if="modal === true" title="Создать заявку" @close="modal = false">
        <request-modal @created="modal = false"></request-modal>
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import {useStore} from 'vuex'
import AppPage  from "../components/AppPage";
import RequestTable from "../components/request/RequestTable";
import AppModal from "../components/ui/AppModal";
import RequestModal from "../components/request/RequestModal";
import AppLoader from "../components/AppLoader";
import RequestFilter from "../components/request/RequestFilter";

export default {
  setup() {
    const store = useStore()
    const modal = ref(false)
    const loading = ref(false)
    const filter = ref({})

    const requests = computed(() => {
      return store.getters['requests/requests']
                  .filter(req => {
                    if (filter.value.name){
                      return req.fio.includes(filter.value.name)
                    }
                    return req
                  })
                  .filter(req => {
                    if (filter.value.status){
                     return req.status === filter.value.status
                    }
                    return req
                  })
    })


    onMounted(async () => {
          loading.value = true
          await store.dispatch('requests/load')
          loading.value = false
        }
    )

    return {
      modal,
      requests,
      loading,
      filter
    }
  },
  components: {AppPage, RequestTable, AppModal, RequestModal, AppLoader, RequestFilter}
}
</script>
