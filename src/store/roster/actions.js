import {
    ADD_ROSTER,
    CLEAR_ROSTER,
    SWAP_ROSTER_DESIGNATIONS,
    ADD_STARTER,
    ADD_ALTERNATE,
 } from './index'

export const addRoster = roster => ({
    type: ADD_ROSTER,
    roster,
})

export const clearRoster = () => ({
    type: CLEAR_ROSTER,
})

export const swapRosterDesignations = ({ starter, alternate }) => ({
    type: SWAP_ROSTER_DESIGNATIONS,
    starter,
    alternate,
})

export const addStarter = ({ addPlayer, removePlayer }) => ({
    type: ADD_STARTER,
    addPlayer,
    removePlayer,
})

export const addAlternate = ({ addPlayer, removePlayer }) => ({
    type: ADD_ALTERNATE,
    addPlayer,
    removePlayer,
})