import { combineReducers } from 'redux'
import rosterReducer from './roster'
import botsReducer from './bots'

const rootReducer = combineReducers({
    roster: rosterReducer,
    bots: botsReducer,
})

export default rootReducer