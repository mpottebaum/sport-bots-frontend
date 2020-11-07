export const ADD_ROSTER = 'ADD_ROSTER'

const rosterReducer = ( state = null, action ) => {
    switch(action.type) {
        case ADD_ROSTER:
            return action.roster
        default:
            return state
    }
}

export default rosterReducer