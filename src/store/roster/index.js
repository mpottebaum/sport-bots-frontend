export const ADD_ROSTER = 'ADD_ROSTER'
export const CLEAR_ROSTER = 'CLEAR_ROSTER'
export const SWAP_ROSTER_DESIGNATIONS = 'SWAP_ROSTER_DESIGNATIONS'
export const ADD_STARTER = 'ADD_STARTER'
export const ADD_ALTERNATE = 'ADD_ALTERNATE'

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
        case ADD_STARTER:
            return {
                alternates: state.alternates,
                starters: state.starters.map(
                    starter => starter.id === action.removePlayer.id ? action.addPlayer : starter
                )
            }
        case ADD_ALTERNATE:
            return {
                starters: state.starters,
                alternates: state.alternates.map(
                    alternate => alternate.id === action.removePlayer.id ? action.addPlayer : alternate
                )
            }
        default:
            return state
    }
}

export default rosterReducer