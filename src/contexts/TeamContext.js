import React, { createContext, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch'
import { authAPI } from '../utils/apiRoutes'

import LoadingPage from '../components/LoadingPage'

export const TeamContext = createContext();

const TeamContextProvider = ({ children }) => {
  const [team, setTeam] = useState(null);
  const { fetchData, loading, setLoading } = useFetch(true)
  const token = localStorage.getItem('token');

  const [rosterChangesMade, setRosterChangesMade] = useState(false)

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

  if (loading) return <LoadingPage />

  return (
    <TeamContext.Provider
      value={{
        team,
        setTeam,
        setTeamFromResp,
        removeTeam,
        rosterChangesMade,
        setRosterChangesMade,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export default TeamContextProvider;