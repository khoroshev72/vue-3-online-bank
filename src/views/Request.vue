<template>
  <app-loader v-if="loading"></app-loader>
  <app-page v-else-if="request" title="Страница заявки" back>
    <p><strong>ФИО</strong> {{ request.fio }}</p>
    <p><strong>Телефон</strong> {{ request.phone }}</p>
    <p><strong>Сумма</strong> {{currency(request.amount)}}</p>
    <p><strong>Статус</strong> <app-status :type="request.status"/></p>

    <button class="btn danger" @click="remove">Удалить</button>

    <button class="btn" v-if="hasChanges" @click="update">Обновить</button>

    <div class="form-control pt-1">
      <label for="status">Статус</label>
      <select name="status" id="status" v-model="status">
        <option value="pending">Выполняется</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="done">Завершён</option>
      </select>
    </div>

  </app-page>
  <h3 v-else >Заявки # {{$route.params.id}} не существует</h3>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import AppPage from "../components/AppPage";
import AppLoader from "../components/AppLoader";
import {currency} from "../utils/currency";
import AppStatus from "../components/ui/AppStatus";

export default {
  setup(){
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const request = ref({})
    const loading = ref(true)
    const status = ref()


    onMounted(async () => {
      loading.value = true
      request.value = await store.dispatch('requests/loadOne', route.params.id)
      status.value = request.value?.status
      loading.value = false
    })

    const hasChanges = computed(() => request.value.status !== status.value)

    const remove = async () => {
      await store.dispatch('requests/remove', route.params.id)
      router.push('/')
    }

    const update = async () => {
      const data = {...request.value, id: route.params.id, status: status.value}
      await store.dispatch('requests/update', data)
      request.value.status = status.value
    }

    return {
      loading, request, currency, remove, update, status, hasChanges
    }
  },
components: {AppPage, AppLoader, AppStatus}
}
</script>

<style scoped>

</style>