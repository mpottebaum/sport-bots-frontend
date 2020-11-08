export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'


const modalReducer = ( state = null, action ) => {
    switch(action.type) {
        case OPEN_MODAL:
            return action.modalType
        case CLOSE_MODAL:
            return null
        default:
            return state
    }
}

export default modalReducer