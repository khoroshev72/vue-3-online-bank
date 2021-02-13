import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'

export function useRequestModal(fn){
    const {handleSubmit, isSubmitting} = useForm({
        initialValues: {
            status: 'active'
        }
    })
    const {value: fio, errorMessage: fioMessage, handleBlur: fioBlur} = useField(
        'fio',
        yup.string()
            .trim()
            .required('Введите ФИО')
    )
    const {value: phone, errorMessage: phoneMessage, handleBlur: phoneBlur} = useField(
        'phone',
        yup.string()
            .trim()
            .required('Введдите телефон')
)
    const {value: amount, errorMessage: amountMessage, handleBlur: amountBlur} = useField(
        'amount',
            yup.number()
                .required('Введите сумму')
                .min(0)

    )
    const {value: status} = useField('status')

    const onSubmit = handleSubmit(fn)

    return {
        fio, fioMessage, fioBlur,
        phone, phoneMessage, phoneBlur,
        amount, amountMessage, amountBlur,
        status,
        onSubmit,
        isSubmitting
    }
}