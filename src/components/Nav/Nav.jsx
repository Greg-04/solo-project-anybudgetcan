import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { useSelector } from 'react-redux';
// import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <>
      <div className="nav">
        <Link to="/homeDashboard">
          <h2 className="nav-title">Any Budget Can</h2>
        </Link>
        <Tabs value={false} variant="fullWidth">
          {/* If no user is logged in, show these links */}
          {!user.id && (
            // If there's no user, show login/registration links
            <Tab
              label="Login / Register"
              className="navLink"
              component={Link}
              to="/login"
              sx={{ fontFamily: 'Rockwell' }}
            />
          )}
          {/* If a user is logged in, show these links */}
          {user.id && (
            <>
              <Tab
                className="navLink"
                to="/homeDashboard"
                label="Home"
                component={Link}
                sx={{ fontFamily: 'Rockwell' }}
              />

              <Tab
                className="navLink"
                to="/info"
                label="Info Page"
                component={Link}
                sx={{ fontFamily: 'Rockwell' }}
              />

              <Tab
                className="navLink"
                to="/addTransactions"
                label="Add Transactions"
                component={Link}
                sx={{ fontFamily: 'Rockwell' }}
              />

              <Tab
                className="navLink"
                to="/viewTransactions"
                label="View Transactions"
                component={Link}
                sx={{ fontFamily: 'Rockwell' }}
              />

              <Tab
                className="navLink"
                to="/expensesPage"
                label="Expenses"
                component={Link}
                sx={{ fontFamily: 'Rockwell' }}
              />

              <Tab
                className="navLink"
                to="/createPlanPage"
                label="Create Plan"
                component={Link}
                sx={{ fontFamily: 'Rockwell' }}
              />

              <Tab
                className="navLink"
                to="/budgetOverviewPage"
                label="Budget Overview"
                component={Link}
                sx={{ fontFamily: 'Rockwell' }}
              />

              <Tab
                className="navLink"
                to="/planInformationPage"
                label="Plan Info"
                component={Link}
                sx={{ fontFamily: 'Rockwell' }}
              />
            </>
          )}
          <Tab
            to="/about"
            className="navLink"
            label="About"
            component={Link}
            sx={{ fontFamily: 'Rockwell', textDecoration: 'underline' }}
          />
          About
        </Tabs>
      </div>
    </>
  );
}

export default Nav;
