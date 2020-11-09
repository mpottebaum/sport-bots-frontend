import React, { createContext, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch'
import { authAPI } from '../utils/apiRoutes'

export const TeamContext = createContext();

const TeamContextProvider = ({ children }) => {
  const [team, setTeam] = useState(null);
  const { fetchData, loading, setLoading } = useFetch(true)
  const token = localStorage.getItem('token');

  useEffect(() => {
    setLoading(true)
    getTeam();
    setLoading(false)
  }, []);

  const getTeam = async () => {
    if (token === null) return;
    const resp = await fetchData({
        url: authAPI,
    })
    if(resp.team) {
        setTeam(resp.team)
    }
  };

  const setTeamFromResp = resp => {
    setTeam(resp.team)
    if(resp.token) {
      localStorage.setItem('token', resp.token)
    }
  }

  const removeTeam = () => {
    setTeam(null)
    localStorage.removeItem('token')
  }

  const toggleRosterSave = () => setTeam({
    ...team,
    saved_roster: !team.saved_roster
  })

  const setRosterChangesMade = rosterChangesMade => setTeam({
    ...team,
    rosterChangesMade,
  })

  if (loading) return null;

  return (
    <TeamContext.Provider
      value={{
        team,
        setTeam,
        setTeamFromResp,
        removeTeam,
        toggleRosterSave,
        setRosterChangesMade,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export default TeamContextProvider;