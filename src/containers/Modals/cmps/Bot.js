import React from 'react'

import Button from '../../../components/Button'

const Bot = ({ bot, addPlayer }) => {
    const { name, speed, strength, agility } = bot
    const attributesSum = speed + strength + agility
    return (
        <tr>
            <td>{name}</td>
            <td>
                <Button onClick={() => addPlayer(bot)} >
                    ADD TO ROSTER
                </Button>
            </td>
            <td>{speed}</td>
            <td>{strength}</td>
            <td>{agility}</td>
            <td>{attributesSum}</td>
        </tr>
    )
}

export default Bot