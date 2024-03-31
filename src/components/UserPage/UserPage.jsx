import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import './UserPage.css';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

//also home page
function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <>
      <div>
        <LogOutButton />
      </div>
      <main>
      <Container
        maxWidth="md"
        sx={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Rockwell' }}>
        <h2>Hi, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#e0e0e0',
            fontFamily: 'Rockwell',
            marginBottom: '20px',
          }}>
          <Link to="homeDashboard">Home</Link>
        </Button>
        
        <h2>Need to get started?</h2>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#e0e0e0',
            fontFamily: 'Rockwell',
            marginBottom: '20px',
          }}
          id="button">
          <Link to="/info">How To Start</Link>
        </Button>
        </Container>
      </main>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
