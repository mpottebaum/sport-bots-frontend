export const SET_REMOVE_PLAYER = 'SET_REMOVE_PLAYER'
export const CLEAR_REMOVE_PLAYER = 'CLEAR_REMOVE_PLAYER'

const removePlayerReducer = ( state = null, action ) => {
    switch(action.type) {
        case SET_REMOVE_PLAYER:
            return action.player
        case CLEAR_REMOVE_PLAYER:
            return null
        default:
            return state
    }
}

export default removePlayerReducer