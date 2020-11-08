export const SET_ERRORS = 'SET_ERRORS'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'


const errorsReducer = ( state = null, action ) => {
    switch(action.type) {
        case SET_ERRORS:
            return action.errors
        case CLEAR_ERRORS:
            return null
        default:
            return state
    }
}

export default errorsReducer