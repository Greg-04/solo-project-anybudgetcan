import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="" onSubmit={login}>
      <Container
        maxWidth="md"
        sx={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Rockwell' }}>
        <Paper
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: '20px',
          }}>
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sx={{
                  color: 'black',
                  textAlign: 'center',
                  fontFamily: 'Rockwell',
                  fontSize: '30px',
                }}>
                Login
              </Grid>
              {errors.loginMessage && (
                <h3 className="alert" role="alert">
                  {errors.loginMessage}
                </h3>
              )}
              <Grid item xs={12}>
                <Typography
                  sx={{
                    color: 'black',
                    textAlign: 'center',
                    fontFamily: 'Rockwell',
                  }}>
                  Username:
                </Typography>
                <TextField
                  fullWidth
                  type="text"
                  name="username"
                  required
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    color: 'black',
                    textAlign: 'center',
                    fontFamily: 'Rockwell',
                  }}>
                  Password:
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#e0e0e0',
                    fontFamily: 'Rockwell',
                    marginBottom: '50px',
                  }}
                  type="submit"
                  name="submit"
                  value="Log In">
                  Log in
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </form>
  );
}

export default LoginForm;
