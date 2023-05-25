import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { Button, Avatar } from '@mui/material';

const MatchPage = () => {
  const navigate = useNavigate();
  const { matchName } = useParams();
  const [stateMatchInfo, setStateMatchInfo] = useState(null);

  const getMatchProfile = async () => {

    try {
      const matchInfo = await axios.get(`/users/match/${ matchName }`);

      if (!matchInfo) {
        throw matchInfo;
      }

      setStateMatchInfo(matchInfo.data);
    } catch (error) {
      console.error('Could not retrieve match info:', error);
    }

  };

  useEffect(() => {
    getMatchProfile();
  }, []);

  const navigateToHome = () => {
    navigate('/');
  };

  if (stateMatchInfo === null) {
    return <></>;
  }

  return (
    <div>
      <h1>Welcome to { stateMatchInfo.name }'s Profile</h1>
      <Avatar alt="User Profile Image" src={ stateMatchInfo.picture } sx={{ width: 200, height: 200 }} referrerPolicy="no-referrer"/>
      <br />
      <br />
      <Button onClick={ navigateToHome } variant="contained"> Back to Home</Button>
    </div>
  );
};

export default MatchPage;