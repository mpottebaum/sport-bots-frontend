import { SET_REMOVE_PLAYER, CLEAR_REMOVE_PLAYER } from './index'

export const setRemovePlayer = player => ({
    type: SET_REMOVE_PLAYER,
    player,
})

export const clearRemovePlayer = () => ({
    type: CLEAR_REMOVE_PLAYER,
})