import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <Button
      variant="contained"
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      sx={{ backgroundColor: '#d50000', fontFamily: 'Rockwell', marginLeft:'55px', color:'#e0e0e0' }}
      onClick={() => dispatch({ type: 'LOGOUT' })}>
      Log Out
    </Button>
  );
}

export default LogOutButton;
