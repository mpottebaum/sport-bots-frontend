import { OPEN_MODAL, CLOSE_MODAL } from './index'

export const openModal = modalType => ({
    type: OPEN_MODAL,
    modalType,
})

export const closeModal = () => ({
    type: CLOSE_MODAL,
})