import React, { createContext, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch'
import { authApi } from '../utils/apiRoutes'

export const TeamContext = createContext();

const TeamContextProvider = ({ children }) => {
  const [team, setTeam] = useState(null);
  const { fetchData, loading } = useFetch()
  const token = localStorage.getItem('token');

  useEffect(() => {
    getTeam();
  }, []);

  const getTeam = async () => {
    if (token === null) return;
    const resp = await fetchData({
        url: authApi,
    })
    if(resp.team) {
        setTeam(resp.team)
    }
  };

  const setTeamFromResp = resp => {
    const { token, team } = resp
    setTeam(team)
    localStorage.setItem('token', token)
  }

  const removeTeam = () => {
    setTeam(null)
    localStorage.removeItem('token')
  }

  if (loading) return null;

  return (
    <TeamContext.Provider
      value={{
        team,
        setTeam,
        setTeamFromResp,
        removeTeam,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export default TeamContextProvider;