import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import modalTypes from './modalTypes'
import { closeModal } from '../../store/modal/actions'

import AddBotToRoster from './types/AddBotToRoster'
import Errors from './types/Errors'

const Modals = () => {
    const showModal = useSelector(state => state.modal)
    const errors = useSelector(state => state.errors)
    const dispatch = useDispatch()

    const onClose = () => dispatch(closeModal())

    const renderModal = () => {
        switch(showModal) {
            case modalTypes.addBotToRoster:
                return <AddBotToRoster onClose={onClose} />
            case modalTypes.Errors:
                return <Errors errors={errors} onClose={onClose} />
            default:
                return null
        }
    }
    return renderModal()
}

export default Modals