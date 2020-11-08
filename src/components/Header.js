import React, { useContext } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { TeamContext } from '../contexts/TeamContext'
import routePaths from '../containers/Router/routePaths'

const Container = styled.div`
    width: 100%;
    background-color: black;
`
    
const Flex = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 10px;
`

const NavItem = styled.div`
    margin-left: 20px;
    color: white;

    &:hover {
        cursor: pointer;
    }
`

const Header = () => {
    const { team, removeTeam } = useContext(TeamContext)
    const history = useHistory()

    const logIn = () => history.push(routePaths.LogIn)

    const logOut = () => {
        removeTeam()
        history.push(routePaths.Home)
    }
    return (
        <Container>
            <Flex>
                {!team && (
                    <NavItem onClick={() => history.push(routePaths.SignUp)}>
                        CREATE TEAM
                    </NavItem>
                )}
                <NavItem onClick={team ? logOut : logIn}>{ team ? 'LOG OUT' : 'LOG IN'}</NavItem>
            </Flex>
        </Container>
    )
}

export default Header