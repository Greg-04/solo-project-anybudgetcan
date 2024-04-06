import React from 'react';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />

      <center>
        <Button
          type="button"
          variant="contained"
          sx={{
            textAlign: 'center',
            fontFamily: 'Rockwell',
            marginTop: '10px',
          }}
          onClick={() => {
            history.push('/login');
          }}>
          Login
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
