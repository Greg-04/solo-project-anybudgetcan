import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="" onSubmit={registerUser}>
      <Container
        maxWidth="md"
        sx={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Rockwell' }}>
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                color: 'black',
                textAlign: 'center',
                fontFamily: 'Rockwell',
                fontSize: '30px'
              }}>
              Register User
            </Grid>
            {errors.registrationMessage && (
              <h3 className="alert" role="alert">
                {errors.registrationMessage}
              </h3>
            )}
            <Grid item xs={12}>
              <p className="">
                Username:
                <TextField
                  fullWidth
                  type="text"
                  name="username"
                  value={username}
                  required
                  onChange={(event) => setUsername(event.target.value)}
                />
              </p>
            </Grid>
            <Grid item xs={12}>
              <p >
                Password:
                <TextField
                  fullWidth
                  type="password"
                  name="password"
                  value={password}
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
              </p>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#e0e0e0',
                  fontFamily: 'Rockwell',
                  marginBottom: '20px',
                }}
                type="submit"
                name="submit"
                value="Register">
                Register
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </form>
  );
}

export default RegisterForm;
