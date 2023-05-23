import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

//Material UI:
import { Button } from '@mui/material';

import Wheel from '../components/Wheel.jsx';
import UserProfile from './UserProfile.jsx';

const App = () => {

  /////////CYNTHIA CODE, LOGAN DID NOT EDIT ////////
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelected = (user) => {
    setSelectedUser(user);
  };

  //useGoogleLogin hook gives the login functionality
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      setUser(codeResponse);
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  //profile is the user profile data from Google
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  //Hook that is used to fetch user profile data when the 'user' state is changed
  //Calling an axios get request
  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  //Logout function associated with the logout button
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };


  //Conditional statement for profile, when there is no profile, that means no one is logged in and it shows the login button
  //If the user is logged in, they see the 'Gettin' Around' Info, created by Cynthia in the original code
  //I added a div below it to display the google profile info to confirm that it had worked but we can edit it when needed
  return (
    <div>
      {profile ? (
        <div>
          <UserProfile profile={ profile }/>
          <div>
            <h1>Wheelin' Around</h1>
            <Wheel onUserSelected={handleUserSelected} />
            {selectedUser && (
              <div>
                <h3>Chat with {selectedUser}</h3>
                {/* Render chat component here */}
              </div>
            )}
          </div>
          <br />
          <br />
          <Button variant="contained" size="small" onClick={ logOut }>Log out</Button>
        </div>
      ) : (
        <div>
          <><h2>Wheel of Love Login</h2><br /><br />
            <Button variant="contained" size="medium" href="/login/google" >Sign in with Google</Button></>
        </div>
      )}
    </div>
  );
};
export default App;

