import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import modalTypes from './modalTypes'

import AddBotToRoster from './types/AddBotToRoster'

const Modals = () => {
    const showModal = useSelector(state => state.modal)

    const renderModal = () => {
        switch(showModal) {
            case modalTypes.addBotToRoster:
                return <AddBotToRoster />
            default:
                return null
        }
    }
    return renderModal()
}

export default Modals