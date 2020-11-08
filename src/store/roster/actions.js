import { ADD_ROSTER, SWAP_ROSTER_DESIGNATIONS } from './index'

export const addRoster = roster => ({
    type: ADD_ROSTER,
    roster,
})

export const swapRosterDesignations = ({ starter, alternate }) => ({
    type: SWAP_ROSTER_DESIGNATIONS,
    starter,
    alternate,
})