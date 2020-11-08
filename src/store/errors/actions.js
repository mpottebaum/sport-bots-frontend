import { SET_ERRORS, CLEAR_ERRORS } from './index'

export const setErrors = errors => ({
    type: SET_ERRORS,
    errors,
})

export const clearErrors = () => ({
    type: CLEAR_ERRORS,
})