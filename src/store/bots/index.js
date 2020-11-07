export const ADD_BOTS = 'ADD_BOTS'

const botsReducer = ( state = null, action ) => {
    switch(action.type) {
        case ADD_BOTS:
            return action.bots
        default:
            return state
    }
}

export default botsReducer