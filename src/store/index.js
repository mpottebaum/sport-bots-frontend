import { combineReducers } from 'redux'
import rosterReducer from './roster'
import botsReducer from './bots'
import modalReducer from './modal'
import removePlayerReducer from './removePlayer'

const rootReducer = combineReducers({
    roster: rosterReducer,
    bots: botsReducer,
    modal: modalReducer,
    removePlayer: removePlayerReducer,
})

export default rootReducer