export const teamAPI = '/teams'

export const authAPI = '/auth'

export const rosterAPI = teamId => `${teamAPI}/${teamId}/rosters`

export const randomRosterAPI = teamId => rosterAPI(teamId) + '/random'

export const botAPI = teamId => `${teamAPI}/${teamId}/bots`