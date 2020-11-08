export const ADD_ROSTER = 'ADD_ROSTER'
export const CLEAR_ROSTER = 'CLEAR_ROSTER'
export const SWAP_ROSTER_DESIGNATIONS = 'SWAP_ROSTER_DESIGNATIONS'

const rosterReducer = ( state = null, action ) => {
    switch(action.type) {
        case ADD_ROSTER:
            return action.roster
        case CLEAR_ROSTER:
            return null
        case SWAP_ROSTER_DESIGNATIONS:
            return {
                starters: state.starters.map(
                    starter => starter.id === action.starter.id ? action.alternate : starter
                ),
                alternates: state.alternates.map(
                    alternate => alternate.id === action.alternate.id ? action.starter : alternate
                )
            }
        default:
            return state
    }
}

export default rosterReducer