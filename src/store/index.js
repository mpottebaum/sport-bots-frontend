import { combineReducers } from 'redux'
import rosterReducer from './roster'
import botsReducer from './bots'
import modalReducer from './modal'
import removePlayerReducer from './removePlayer'
import errorsReducer from './errors'

const rootReducer = combineReducers({
    roster: rosterReducer,
    bots: botsReducer,
    modal: modalReducer,
    removePlayer: removePlayerReducer,
    errors: errorsReducer,
})

export default rootReducer