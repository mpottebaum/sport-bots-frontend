import React from 'react'

import Button from '../../../components/Button'

const Bot = ({ bot, addPlayer }) => (
    <li>
        <p>{bot.name}</p>
        <Button onClick={() => addPlayer(bot)} >
            ADD TO ROSTER
        </Button>
    </li>
)

export default Bot