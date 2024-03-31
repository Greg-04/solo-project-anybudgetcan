import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <>
      <div>
        <Typography sx={{ fontSize: 45, color: 'black', fontFamily: 'Rockwell', textAlign:'center' }}>{heading} to AnyBudgetApp!</Typography>
      </div>
      <div className="container">
        {/* <h2>{heading}</h2> */}

        {/* <div className="grid">
          <div className="grid-col grid-col_8">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra
              lacus ut ex molestie blandit. Etiam et turpis sit amet risus
              mollis interdum. Suspendisse et justo vitae metus bibendum
              fringilla sed sed justo. Aliquam sollicitudin dapibus lectus,
              vitae consequat odio elementum eget. Praesent efficitur eros vitae
              nunc interdum, eu interdum justo facilisis. Sed pulvinar nulla ac
              dignissim efficitur. Quisque eget eros metus. Vestibulum bibendum
              fringilla nibh a luctus. Duis a sapien metus.
            </p>
          </div> */}
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <Typography sx={{ fontSize: 16, color: 'black', fontFamily: 'Rockwell', textAlign:'center' }}>Already a Member?</Typography>
            <Button variant="contained" sx={{ textAlign: 'center', fontFamily:'Rockwell' }} onClick={onLogin}>
              Login
            </Button>
          </center>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

export default LandingPage;
