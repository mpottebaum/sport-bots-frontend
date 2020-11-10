import React from 'react'

import Table from 'react-bootstrap/Table'
import Player from './Player'

const PlayersList = ({ players, swapper, starter=false}) => (
    <Table responsive='sm' hover>
        <thead>
            <tr>
                <th>Name</th>
                <th>#</th>
                <th>Speed</th>
                <th>Strength</th>
                <th>Agility</th>
                <th>Attribute Sum</th>
            </tr>
        </thead>
        <tbody>
            {players.map(player => <Player player={player} key={player.id} starter={starter} swapper={swapper} />)}
        </tbody>
    </Table>
)

export default PlayersList