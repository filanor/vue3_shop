import {computed, watch} from 'vue'
import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useLoginForm() {
  const MIN_LENGTH = 6  // минимальная длина пароля 

  const store = useStore()
  const router = useRouter()

  const {handleSubmit, isSubmitting, submitCount} = useForm()

  const isTooManyAttemps = computed(() => submitCount.value >= 3)

  // Если слишком много попыток входа - устанавливаем блокировку
  watch(isTooManyAttemps, val => {
    if(val) {
      setTimeout( () => submitCount.value = 0, 1500)
    }
  })

  // Валидируем форму с помощью vee-validate
  const { value: email, errorMessage: eError, handleBlur: eBlur} = useField(
    'email',
    yup
      .string()
      .trim()
      .required('Необходимо ввести Email')
      .email('Неверный формат')
  )
  const { value: password, errorMessage: pError, handleBlur: pBlur} = useField(
    'password',
    yup
      .string()
      .trim()
      .required('Необходимо ввести пароль')
      .min(MIN_LENGTH, `Пароль не может быть меньше ${MIN_LENGTH} символов`)
  )


  const onSubmit = handleSubmit(async values => {
    //  обернули все в try-catch, что бы в случае неверных донных не было попытки редиректа редиректа
    try{
      await store.dispatch('auth/login', values)
      router.push('/admin')
    }catch{}
    
  })

  return {
    email,
    password, 
    eError,
    pError,
    eBlur,
    pBlur, 
    onSubmit,
    isSubmitting,
    isTooManyAttemps
  }
}