import axios from '../../axios/create'
import store from '../index'

export default {
    namespaced: true,
    state(){
        return {
            requests: []
        }
    },
    mutations: {
        setRequests(state, requests){
            state.requests = requests
        },
        addRequest(state, request){
            state.requests.push(request)
        }
    },
    actions: {
        async create({commit, dispatch}, payload){
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.post(`/requests.json?auth=${token}`, payload)
                commit('addRequest', payload)
                dispatch('setMessage', {
                    type: 'primary',
                    value: 'Заявка успешно добавлена'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    type: 'danger',
                    value: e.message
                }, {root: true})
            }
        },
        async load({commit, dispatch}){
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.get(`/requests.json?auth=${token}`)
                const requests = Object.keys(data).map(id => ({...data[id], id}))
                commit('setRequests', requests)
            } catch (e) {
                dispatch('setMessage', {
                    type: 'danger',
                    value: e.message
                }, {root: true})
            }
        },
        async loadOne({commit, dispatch}, id){
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.get(`/requests/${id}.json?auth=${token}`)
                return data
            } catch (e) {
                dispatch('setMessage', {
                    type: 'danger',
                    value: e.message
                }, {root: true})
            }
        },
        async remove({dispatch}, id){
            try {
                const token = store.getters['auth/token']
                await axios.delete(`/requests/${id}.json?auth=${token}`)
                dispatch('setMessage', {
                    type: 'primary',
                    value: 'Заявка удалена'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    type: 'danger',
                    value: e.message
                }, {root: true})
            }
        },
        async update({dispatch}, request){
            try {
                const token = store.getters['auth/token']
                await axios.put(`/requests/${request.id}.json?auth=${token}`, request)
                dispatch('setMessage', {
                    type: 'primary',
                    value: 'Заявка обновлена'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    type: 'danger',
                    value: e.message
                }, {root: true})
            }
        }
    },
    getters: {
        requests(state){
            return state.requests
        }
    }
}