import React from 'react'

import Player from './Player'

const PlayersList = ({ players, swapper, starter=false}) => (
    <ul>
        {players.map(player => <Player player={player} key={player.id} starter={starter} swapper={swapper} />)}
    </ul>
)

export default PlayersList