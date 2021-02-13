import {computed, watch} from 'vue'
import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useLoginForm(){
  const store = useStore()
  const router = useRouter()
  const {handleSubmit, isSubmitting, submitCount} = useForm()
  const PASS_LENGTH = 6
  const {value: email, errorMessage: emailMessage, handleBlur: emailBlur} = useField(
    'email',
    yup
      .string()
      .trim()
      .required('Введите Email')
      .email('Введите корректный Email')
    )
  const {value: password, errorMessage: passwordMessage, handleBlur: passwordBlur} = useField(
    'password',
    yup
      .string()
      .trim()
      .required('Введите пароль')
      .min(PASS_LENGTH, `Пароль должен быть не менее ${PASS_LENGTH} символов`)
  )

  const tooManyAttempts = computed(() => submitCount.value >= 3)

  watch(tooManyAttempts, val => {
    if (val) {
      setTimeout(() => submitCount.value = 0, 1500)
    }
  })

  const onSubmit = handleSubmit(async values => {
    try {
      await store.dispatch('auth/login', values)
      router.push('/')
    } catch (e){

    }

  })

  return {
    email,
    emailMessage,
    emailBlur,
    password,
    passwordMessage,
    passwordBlur,
    onSubmit,
    isSubmitting,
    tooManyAttempts
  }
}