import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import './UserPage.css';
import { Link } from 'react-router-dom';

//also home page
function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <>
      <div>
        <LogOutButton className="btn" />
      </div>
      <div className="header">
        <h2>Hi, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <button className="btn">
          <Link to="homeDashboard">Home</Link>
        </button>
      </div>

      <main className="mainForm">
        <h2 className="header">Need to get started?</h2>
        <button className="btn" id="button">
          <Link to="/info">How To Start</Link>
        </button>
      </main>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
