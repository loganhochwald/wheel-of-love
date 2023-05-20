import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

import Wheel from '../components/Wheel.jsx';

const App = () => {

  /////////CYNTHIA CODE, LOGAN DID NOT EDIT ////////
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelected = (user) => {
    setSelectedUser(user);
  };

  /////////////////LOGAN LOGIN CODE/////////

  //user is the logged in user
  //profile is the user profile data from Google
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  //useGoogleLogin hook gives the login functionality
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

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
          <div>
            <h1>Gettin' Around</h1>
            <h2>A Dating Site</h2>
            <Wheel onUserSelected={handleUserSelected} />
            {selectedUser && (
              <div>
                <h3>Chat with {selectedUser}</h3>
                {/* Render chat component here */}
              </div>
            )}
          </div>
          <img src={ profile.picture } alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: { profile.name }</p>
          <p>Email Address: { profile.email }</p>
          <br />
          <br />
          <button onClick={ logOut }>Log out</button>
        </div>
      ) : (
        <><h2>Google Login</h2><br /><br /><button onClick={() => login()}>Sign in with Google</button></>
      )}
    </div>
  );
};
export default App;
