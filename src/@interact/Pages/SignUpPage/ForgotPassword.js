import { TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from "react-router-dom";
import { sendPasswordReset } from "@jumbo/services/auth/firebase/firebase";

import './SignUpPage.css'
import useCurrentUser from '@interact/Hooks/use-current-user';
import Loading from '@interact/Components/Loading/Loading';
import InteractFlashyButton from '@interact/Components/Button/InteractFlashyButton';

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate(`/u/${user.name}`);
  }, [user]);


  return (
    <div className='SignUpPage'>
      {/* <div className='CredentialsBox'> */}

      <div className='CredentialBox'>

        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" style={{ height: 100, padding: 20 }} />

        <br />
        <div className='TextInputWrapper'>
          <TextField id="outlined-basic" label="Email address" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <br></br>
        <div className='ButtonsWrapper' style={{margin:10}}>
          <InteractFlashyButton onClick={()=>sendPasswordReset(email)}>
            Reset Password
          </InteractFlashyButton>
        </div>
        <div style={{ paddingTop: 20 }}>
          Don't remember your email? <Link to='/signup'>Contact Support.</Link>
        </div>



      </div>
      {/* </div> */}
    </div>
  );
}

export default ForgotPassword;